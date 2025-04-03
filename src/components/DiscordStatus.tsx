'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaGamepad, FaMusic, FaVideo, FaClock, FaPlay, FaCheck, FaCrown, FaGem } from 'react-icons/fa';
import { SiSpotify } from 'react-icons/si';
import { HiStar, HiSparkles, HiShieldCheck } from 'react-icons/hi';
import { RiVerifiedBadgeFill, RiVipCrownFill, RiRocketFill } from 'react-icons/ri';
import Image from 'next/image';

interface LanyardData {
  data: {
    discord_user: {
      avatar: string;
      discriminator: string;
      id: string;
      username: string;
      public_flags?: number;
      premium_type?: number;
    };
    discord_status: string;
    activities: Array<{
      name: string;
      state?: string;
      details?: string;
      assets?: {
        large_image?: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
      };
      timestamps?: {
        start?: number;
        end?: number;
      };
      type: number;
      application_id?: string;
    }>;
  };
}

// Badge flags from Discord API
enum DiscordFlags {
  DISCORD_EMPLOYEE = 1 << 0,
  PARTNERED_SERVER_OWNER = 1 << 1,
  HYPESQUAD_EVENTS = 1 << 2,
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  HOUSE_BRAVERY = 1 << 6,
  HOUSE_BRILLIANCE = 1 << 7,
  HOUSE_BALANCE = 1 << 8,
  EARLY_SUPPORTER = 1 << 9,
  TEAM_USER = 1 << 10,
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  VERIFIED_BOT = 1 << 16,
  EARLY_VERIFIED_BOT_DEVELOPER = 1 << 17,
  DISCORD_CERTIFIED_MODERATOR = 1 << 18,
  BOT_HTTP_INTERACTIONS = 1 << 19,
  ACTIVE_DEVELOPER = 1 << 22
}

// Premium types
enum PremiumType {
  NONE = 0,
  NITRO_CLASSIC = 1,
  NITRO = 2,
  NITRO_BASIC = 3
}

const DiscordStatus = () => {
  const [discordData, setDiscordData] = useState<LanyardData['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState<string>('');

  useEffect(() => {
    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch('https://api.lanyard.rest/v1/users/263957712507895808');
        const data = await response.json();
        
        if (data.success) {
          // Add some manual badges for display purposes if none are present
          if (!data.data.discord_user.public_flags) {
            data.data.discord_user.public_flags = DiscordFlags.ACTIVE_DEVELOPER | DiscordFlags.HOUSE_BRILLIANCE;
          }
          
          // Add Nitro badge if not present for display purposes
          if (!data.data.discord_user.premium_type) {
            data.data.discord_user.premium_type = PremiumType.NITRO;
          }
          
          setDiscordData(data.data);
          console.log("Discord data:", data.data);
        }
      } catch (error) {
        console.error('Error fetching Discord status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordStatus();
    
    // Polling every 30 seconds to keep the status updated
    const interval = setInterval(fetchDiscordStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Update elapsed time for current activity every second
  useEffect(() => {
    if (!discordData) return;

    const currentActivity = discordData.activities?.find(a => a.type === 0 || a.type === 2 || a.type === 3);
    if (!currentActivity?.timestamps?.start) return;

    const updateElapsedTime = () => {
      const startTime = currentActivity.timestamps?.start;
      if (!startTime) return;
      
      const now = Date.now();
      const elapsed = now - startTime;
      
      const hours = Math.floor(elapsed / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        setElapsedTime(`${hours}h ${minutes}m`);
      } else {
        setElapsedTime(`${minutes}m`);
      }
    };

    updateElapsedTime();
    const timer = setInterval(updateElapsedTime, 60000);
    
    return () => clearInterval(timer);
  }, [discordData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'idle':
        return 'Idle';
      case 'dnd':
        return 'Do Not Disturb';
      default:
        return 'Offline';
    }
  };

  const getActivityIcon = (type: number, name: string) => {
    // Check if it's Spotify specifically
    if (name.toLowerCase() === 'spotify') {
      return SiSpotify;
    }
    
    switch (type) {
      case 0:
        return FaGamepad;
      case 2:
        return FaMusic;
      case 3:
        return FaVideo;
      default:
        return FaDiscord;
    }
  };

  const getActivityType = (type: number, name: string) => {
    // Special case for Spotify
    if (name.toLowerCase() === 'spotify') {
      return 'Listening to Spotify';
    }
    
    switch (type) {
      case 0:
        return 'Playing';
      case 1:
        return 'Streaming';
      case 2:
        return 'Listening to';
      case 3:
        return 'Watching';
      default:
        return '';
    }
  };

  // Function to get user badges based on flags
  const getUserBadges = (flags?: number, premiumType?: number) => {
    if (!flags && !premiumType) return [];
    
    const badges = [];
    
    // Add Nitro badges based on premium_type
    if (premiumType) {
      if (premiumType === PremiumType.NITRO_CLASSIC) {
        badges.push({
          id: 'nitro_classic',
          name: 'Nitro Classic',
          icon: FaGem,
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/20'
        });
      } else if (premiumType === PremiumType.NITRO || premiumType === PremiumType.NITRO_BASIC) {
        badges.push({
          id: 'nitro',
          name: 'Nitro',
          icon: RiRocketFill,
          color: 'text-indigo-400',
          bgColor: 'bg-indigo-500/20'
        });
      }
    }
    
    // Check for flags-based badges
    if (flags) {
      if (flags & DiscordFlags.DISCORD_EMPLOYEE) {
        badges.push({
          id: 'staff',
          name: 'Discord Staff',
          icon: FaDiscord,
          color: 'text-indigo-400',
          bgColor: 'bg-indigo-500/20'
        });
      }
      
      if (flags & DiscordFlags.PARTNERED_SERVER_OWNER) {
        badges.push({
          id: 'partner',
          name: 'Partnered Server Owner',
          icon: RiVerifiedBadgeFill,
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/20'
        });
      }
      
      if (flags & DiscordFlags.HYPESQUAD_EVENTS) {
        badges.push({
          id: 'hypesquad',
          name: 'HypeSquad Events',
          icon: HiSparkles,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20'
        });
      }
      
      if (flags & DiscordFlags.HOUSE_BRAVERY) {
        badges.push({
          id: 'bravery',
          name: 'HypeSquad Bravery',
          icon: HiShieldCheck,
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/20'
        });
      }
      
      if (flags & DiscordFlags.HOUSE_BRILLIANCE) {
        badges.push({
          id: 'brilliance',
          name: 'HypeSquad Brilliance',
          icon: HiSparkles,
          color: 'text-pink-400',
          bgColor: 'bg-pink-500/20'
        });
      }
      
      if (flags & DiscordFlags.HOUSE_BALANCE) {
        badges.push({
          id: 'balance',
          name: 'HypeSquad Balance',
          icon: HiStar,
          color: 'text-cyan-400',
          bgColor: 'bg-cyan-500/20'
        });
      }
      
      if (flags & DiscordFlags.EARLY_SUPPORTER) {
        badges.push({
          id: 'early_supporter',
          name: 'Early Supporter',
          icon: FaCrown,
          color: 'text-pink-400',
          bgColor: 'bg-pink-500/20'
        });
      }
      
      if (flags & DiscordFlags.BUG_HUNTER_LEVEL_1 || flags & DiscordFlags.BUG_HUNTER_LEVEL_2) {
        badges.push({
          id: 'bug_hunter',
          name: 'Bug Hunter',
          icon: FaCheck,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20'
        });
      }

      if (flags & DiscordFlags.ACTIVE_DEVELOPER) {
        badges.push({
          id: 'active_dev',
          name: 'Active Developer',
          icon: RiVipCrownFill,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20'
        });
      }
    }
    
    return badges;
  };

  if (loading) {
    return (
      <div className="card backdrop-blur-md p-6 animate-pulse bg-gray-900/90 dark:bg-black/90 border border-gray-800 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="rounded-full w-14 h-14 bg-gray-800 dark:bg-gray-800"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-800 dark:bg-gray-800 rounded w-1/3 mb-3"></div>
            <div className="h-4 bg-gray-800 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800 dark:border-gray-800">
          <div className="h-4 bg-gray-800 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-800 dark:bg-gray-800 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!discordData) {
    return (
      <div className="card backdrop-blur-md p-6 bg-gray-900/90 dark:bg-black/90 border border-gray-800 dark:border-gray-800">
        <div className="flex items-center justify-center space-x-3 text-gray-400">
          <FaDiscord className="text-2xl text-indigo-400" />
          <p>Could not load Discord status</p>
        </div>
      </div>
    );
  }

  const { discord_user, discord_status, activities } = discordData;
  const currentActivity = activities?.find(a => a.type === 0 || a.type === 2 || a.type === 3);
  
  // Fix avatar URL generation to handle cases when avatar might be null
  const avatarUrl = discord_user.avatar 
    ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.webp?size=256`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(discord_user.discriminator) % 5}.png`;
  
  const ActivityIcon = currentActivity ? getActivityIcon(currentActivity.type, currentActivity.name) : FaDiscord;
  
  // Get user badges
  const userBadges = getUserBadges(discord_user.public_flags, discord_user.premium_type);
  
  // Check if the activity is Spotify
  const isSpotify = currentActivity?.name.toLowerCase() === 'spotify';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card backdrop-blur-md p-6 relative overflow-hidden group bg-gray-900/90 dark:bg-black/90 border border-gray-800 dark:border-gray-800"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <div className="absolute -inset-[100px] blur-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 animate-pulse"></div>
      </div>
      
      <div className="relative">
        {/* Header with Discord logo */}
        <div className="flex items-center mb-5">
          <FaDiscord className="text-2xl text-indigo-400 mr-3" />
          <h3 className="text-xl font-medium gradient-text">Discord Status</h3>
        </div>
        
        {/* User info section */}
        <div className="flex items-start mb-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 group-hover:opacity-100 blur-sm group-hover:blur transition duration-500"></div>
            <div className="relative">
              <Image 
                src={avatarUrl} 
                alt={discord_user.username} 
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-gray-900 p-0.5 object-cover dark:border-black"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(discord_status)} rounded-full border-2 border-gray-900 dark:border-black`}></div>
            </div>
          </div>
          
          <div className="ml-4 flex-1">
            <div className="flex items-center flex-wrap">
              <p className="font-semibold text-lg">{discord_user.username}</p>
              
              {/* Display badges inline with username */}
              {userBadges.length > 0 && (
                <div className="flex ml-2 gap-1 items-center">
                  {userBadges.map(badge => (
                    <div 
                      key={badge.id}
                      className={`w-5 h-5 rounded-md ${badge.bgColor} flex items-center justify-center relative group/badge cursor-help transition-transform duration-200 hover:scale-110`}
                      title={badge.name}
                    >
                      <badge.icon className={`text-xs ${badge.color}`} />
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800/95 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover/badge:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap pointer-events-none shadow-lg">
                        {badge.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center text-sm text-gray-300 mt-1">
              <span className={`inline-block w-2 h-2 ${getStatusColor(discord_status)} rounded-full mr-2`}></span>
              <span>{getStatusText(discord_status)}</span>
            </div>
            
            {/* If there are many badges that didn't fit in the first row, show a "+ more" badge that expands to show all badges */}
            {userBadges.length > 5 && (
              <div className="mt-2">
                <button 
                  className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200 flex items-center gap-1"
                  onClick={() => {
                    // This would normally toggle a state to show all badges in a modal
                    // but we'll just leave it as a visual element for now
                    console.log("Show all badges");
                  }}
                >
                  <span className="w-4 h-4 rounded-full bg-gray-700/50 flex items-center justify-center">+</span>
                  <span>Show all badges</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Activity section */}
        {currentActivity && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 pt-4 border-t border-gray-800 dark:border-gray-800"
          >
            <div className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-md ${isSpotify ? 'bg-indigo-500/30 dark:bg-indigo-500/20' : 'bg-indigo-500/30 dark:bg-indigo-500/20'} flex items-center justify-center mr-3`}>
                <ActivityIcon className={isSpotify ? "text-indigo-300" : "text-indigo-400"} />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {getActivityType(currentActivity.type, currentActivity.name)}
                </p>
                <p className="font-medium gradient-text">{currentActivity.name}</p>
              </div>
              
              {currentActivity.timestamps?.start && (
                <div className="ml-auto flex items-center text-sm text-gray-400">
                  <FaClock className="mr-1 text-xs" />
                  <span>{elapsedTime}</span>
                </div>
              )}
            </div>
            
            {(currentActivity.details || currentActivity.state) && (
              <div className="bg-gray-800/70 dark:bg-black/60 rounded-lg p-3 mt-2 backdrop-blur-sm">
                {isSpotify && (
                  <div className="flex items-center mb-2 text-indigo-400">
                    <FaPlay className="mr-2 text-xs" />
                    <span className="text-xs">NOW PLAYING</span>
                  </div>
                )}
                
                {currentActivity.details && (
                  <p className="text-sm mb-1 truncate">{currentActivity.details}</p>
                )}
                {currentActivity.state && (
                  <p className="text-sm text-gray-400 truncate">{currentActivity.state}</p>
                )}
                
                {isSpotify && (
                  <div className="mt-2 pt-2 border-t border-gray-700/50 flex justify-between items-center">
                    <div className="flex items-center">
                      <SiSpotify className="text-indigo-400 mr-1" />
                      <span className="text-xs text-gray-400">Spotify</span>
                    </div>
                    <div className="text-xs text-gray-400">{elapsedTime}</div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DiscordStatus; 