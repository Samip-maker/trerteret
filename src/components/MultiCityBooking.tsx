
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, X, Calendar, Users, Plane } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Destination {
  id: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  accommodation: string;
  estimatedCost: number;
}

const MultiCityBooking = () => {
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: '1',
      city: 'Gangtok',
      country: 'Sikkim',
      startDate: '',
      endDate: '',
      accommodation: '',
      estimatedCost: 15000
    }
  ]);
  const [totalCost, setTotalCost] = useState(0);
  const { toast } = useToast();

  const addDestination = () => {
    const newDestination: Destination = {
      id: Date.now().toString(),
      city: '',
      country: '',
      startDate: '',
      endDate: '',
      accommodation: '',
      estimatedCost: 0
    };
    setDestinations([...destinations, newDestination]);
  };

  const removeDestination = (id: string) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter(dest => dest.id !== id));
    }
  };

  const updateDestination = (id: string, field: keyof Destination, value: string | number) => {
    setDestinations(destinations.map(dest => 
      dest.id === id ? { ...dest, [field]: value } : dest
    ));
  };

  const calculateTotalCost = () => {
    const total = destinations.reduce((sum, dest) => sum + dest.estimatedCost, 0);
    setTotalCost(total);
  };

  React.useEffect(() => {
    calculateTotalCost();
  }, [destinations]);

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-600" />
            Multi-City Trip Planner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {destinations.map((destination, index) => (
            <div key={destination.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Destination {index + 1}
                </h3>
                {destinations.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDestination(destination.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-900 dark:text-white">City</Label>
                  <Input
                    value={destination.city}
                    onChange={(e) => updateDestination(destination.id, 'city', e.target.value)}
                    placeholder="Enter city name"
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-white">Country</Label>
                  <Input
                    value={destination.country}
                    onChange={(e) => updateDestination(destination.id, 'country', e.target.value)}
                    placeholder="Enter country name"
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-white">Start Date</Label>
                  <Input
                    type="date"
                    value={destination.startDate}
                    onChange={(e) => updateDestination(destination.id, 'startDate', e.target.value)}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-white">End Date</Label>
                  <Input
                    type="date"
                    value={destination.endDate}
                    onChange={(e) => updateDestination(destination.id, 'endDate', e.target.value)}
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-white">Accommodation</Label>
                  <Input
                    value={destination.accommodation}
                    onChange={(e) => updateDestination(destination.id, 'accommodation', e.target.value)}
                    placeholder="Hotel/Resort preference"
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <Label className="text-gray-900 dark:text-white">Estimated Cost (₹)</Label>
                  <Input
                    type="number"
                    value={destination.estimatedCost}
                    onChange={(e) => updateDestination(destination.id, 'estimatedCost', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            onClick={addDestination}
            variant="outline"
            className="w-full border-dashed border-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Destination
          </Button>

          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-green-800 dark:text-green-200">Total Estimated Cost:</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">₹{totalCost.toLocaleString()}</span>
            </div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            Book Multi-City Trip
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiCityBooking;
