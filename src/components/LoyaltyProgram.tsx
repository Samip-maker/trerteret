
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Gift, Users, Coins } from "lucide-react";

interface LoyaltyTier {
  name: string;
  minPoints: number;
  benefits: string[];
  color: string;
  icon: React.ReactNode;
}

const LoyaltyProgram = () => {
  const [currentPoints] = useState(2750);
  const [currentTier] = useState('Silver');
  const [referralCode] = useState('SKM2024');

  const tiers: LoyaltyTier[] = [
    {
      name: 'Bronze',
      minPoints: 0,
      benefits: ['5% discount on bookings', 'Free cancellation', 'Priority support'],
      color: 'bg-amber-600',
      icon: <Trophy className="h-5 w-5" />
    },
    {
      name: 'Silver',
      minPoints: 2000,
      benefits: ['10% discount on bookings', 'Free room upgrades', 'Late checkout', 'Welcome drinks'],
      color: 'bg-gray-400',
      icon: <Star className="h-5 w-5" />
    },
    {
      name: 'Gold',
      minPoints: 5000,
      benefits: ['15% discount on bookings', 'Complimentary breakfast', 'Airport transfers', 'Exclusive deals'],
      color: 'bg-yellow-500',
      icon: <Gift className="h-5 w-5" />
    },
    {
      name: 'Platinum',
      minPoints: 10000,
      benefits: ['20% discount on bookings', 'Personal concierge', 'Spa credits', 'VIP experiences'],
      color: 'bg-purple-600',
      icon: <Coins className="h-5 w-5" />
    }
  ];

  const getCurrentTierIndex = () => {
    return tiers.findIndex(tier => tier.name === currentTier);
  };

  const getProgressToNextTier = () => {
    const currentIndex = getCurrentTierIndex();
    if (currentIndex === tiers.length - 1) return 100;
    
    const currentTierPoints = tiers[currentIndex].minPoints;
    const nextTierPoints = tiers[currentIndex + 1].minPoints;
    const progress = ((currentPoints - currentTierPoints) / (nextTierPoints - currentTierPoints)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Trophy className="h-6 w-6 text-green-600" />
            Your Loyalty Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge className={`${tiers[getCurrentTierIndex()].color} text-white mb-2`}>
                {currentTier} Member
              </Badge>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentPoints} Points</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Next tier:</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {getCurrentTierIndex() < tiers.length - 1 
                  ? `${tiers[getCurrentTierIndex() + 1].minPoints - currentPoints} points to ${tiers[getCurrentTierIndex() + 1].name}`
                  : 'Maximum tier reached!'
                }
              </p>
            </div>
          </div>
          
          {getCurrentTierIndex() < tiers.length - 1 && (
            <div className="space-y-2">
              <Progress value={getProgressToNextTier()} className="h-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(getProgressToNextTier())}% to next tier
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loyalty Tiers */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Membership Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-4 rounded-lg border-2 ${
                  tier.name === currentTier 
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tier.color} text-white`}>
                      {tier.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tier.minPoints}+ points
                      </p>
                    </div>
                  </div>
                  {tier.name === currentTier && (
                    <Badge className="bg-green-600 text-white">Current</Badge>
                  )}
                </div>
                <ul className="space-y-1">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Referral Program */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Referral Program
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Refer Friends & Earn Points!
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Share your referral code and earn 500 points for each friend who books their first trip.
            </p>
            <div className="flex items-center gap-2">
              <code className="bg-white dark:bg-gray-800 px-3 py-2 rounded border text-lg font-mono">
                {referralCode}
              </code>
              <Button size="sm" variant="outline">
                Copy Code
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Referrals</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">6,000</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Points Earned</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">₹2,400</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Saved</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyProgram;
