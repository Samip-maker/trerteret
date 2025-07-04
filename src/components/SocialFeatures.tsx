
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Users, Camera, MapPin, Calendar } from "lucide-react";

interface TravelPost {
  id: string;
  user: {
    name: string;
    avatar: string;
    location: string;
  };
  content: string;
  image: string;
  likes: number;
  comments: number;
  location: string;
  date: string;
  tags: string[];
}

const SocialFeatures = () => {
  const [posts] = useState<TravelPost[]>([
    {
      id: '1',
      user: {
        name: 'Priya Sharma',
        avatar: 'photo-1494790108755-2616b612b1d4',
        location: 'Delhi, India'
      },
      content: 'Just had the most incredible sunrise view from Tiger Hill! The golden light over Kanchenjunga was absolutely breathtaking. Sikkim never fails to amaze me! 🏔️',
      image: 'photo-1506905925346-21bda4d32df4',
      likes: 124,
      comments: 18,
      location: 'Tiger Hill, Darjeeling',
      date: '2 hours ago',
      tags: ['sunrise', 'mountains', 'sikkim']
    },
    {
      id: '2',
      user: {
        name: 'Raj Patel',
        avatar: 'photo-1507003211169-0a1dd7228f2d',
        location: 'Mumbai, India'
      },
      content: 'Tea tasting at a local plantation was such a unique experience! Met some amazing fellow travelers here. Group trips are the best! 🍃',
      image: 'photo-1558618666-fcd25c85cd64',
      likes: 89,
      comments: 12,
      location: 'Tea Gardens, Gangtok',
      date: '5 hours ago',
      tags: ['tea', 'plantation', 'group', 'culture']
    }
  ]);

  const [following] = useState([
    { name: 'Mountain Explorer', followers: '2.5k', avatar: 'photo-1472099645785-5658abf4ff4e' },
    { name: 'Sikkim Wanderer', followers: '1.8k', avatar: 'photo-1517841905240-472988babdf9' },
    { name: 'Adventure Seeker', followers: '3.2k', avatar: 'photo-1539571696357-5a69c17a67c6' }
  ]);

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Input
                placeholder="Share your travel experience..."
                className="bg-gray-50 dark:bg-gray-700 border-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Camera className="h-4 w-4 mr-1" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location
                  </Button>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={`https://images.unsplash.com/${post.user.avatar}?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{post.user.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-3 w-3 mr-1" />
                      {post.location} • {post.date}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>

              {/* Post Image */}
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${post.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt="Travel post"
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                  Follow Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Group Booking */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Group Booking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Join other travelers or create your own group for better deals and shared experiences!
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Join a Group
            </Button>
            <Button variant="outline">
              Create Group
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Following */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Following</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {following.map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://images.unsplash.com/${user.avatar}?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.followers} followers</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Following
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialFeatures;
