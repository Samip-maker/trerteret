import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Image, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Tag, 
  Plus, 
  X,
  Loader2
} from "lucide-react";

const packageFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().min(3, { message: "Please select a location" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  price: z.number().min(1, { message: "Price must be greater than 0" }),
  discountPrice: z.number().optional(),
  category: z.string().min(1, { message: "Category is required" }),
  maxPeople: z.number().min(1, { message: "Maximum people is required" }),
  difficulty: z.string().min(1, { message: "Difficulty level is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  highlights: z.array(z.string()).min(1, { message: "Add at least one highlight" }),
  included: z.array(z.string()).min(1, { message: "Add at least one inclusion" }),
  excluded: z.array(z.string()).default([]),
  images: z.array(z.string()).min(1, { message: "Add at least one image" }),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true)
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

export default function PartnerCreatePackage() {
  const [isLoading, setIsLoading] = useState(false);
  const [highlightInput, setHighlightInput] = useState("");
  const [includedInput, setIncludedInput] = useState("");
  const [excludedInput, setExcludedInput] = useState("");
  const [imageInput, setImageInput] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      duration: "",
      price: 0,
      category: "",
      maxPeople: 1,
      difficulty: "easy",
      startDate: "",
      endDate: "",
      highlights: [],
      included: [],
      excluded: [],
      images: [],
      isFeatured: false,
      isActive: true
    }
  });

  const onSubmit = async (data: PackageFormValues) => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      console.log("Package data:", data);
      
      toast({
        title: "Package created successfully!",
        description: "Your travel package has been created and is now live.",
      });
      
      // Redirect to packages list
      navigate("/partner/packages");
    } catch (error) {
      console.error("Error creating package:", error);
      toast({
        title: "Error",
        description: "Failed to create package. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addHighlight = () => {
    if (highlightInput.trim() && !form.getValues("highlights").includes(highlightInput)) {
      const currentHighlights = form.getValues("highlights") || [];
      form.setValue("highlights", [...currentHighlights, highlightInput.trim()]);
      setHighlightInput("");
    }
  };

  const removeHighlight = (index: number) => {
    const highlights = [...form.getValues("highlights")];
    highlights.splice(index, 1);
    form.setValue("highlights", highlights);
  };

  const addIncluded = () => {
    if (includedInput.trim() && !form.getValues("included").includes(includedInput)) {
      const currentIncluded = form.getValues("included") || [];
      form.setValue("included", [...currentIncluded, includedInput.trim()]);
      setIncludedInput("");
    }
  };

  const removeIncluded = (index: number) => {
    const included = [...form.getValues("included")];
    included.splice(index, 1);
    form.setValue("included", included);
  };

  const addExcluded = () => {
    if (excludedInput.trim() && !form.getValues("excluded").includes(excludedInput)) {
      const currentExcluded = form.getValues("excluded") || [];
      form.setValue("excluded", [...currentExcluded, excludedInput.trim()]);
      setExcludedInput("");
    }
  };

  const removeExcluded = (index: number) => {
    const excluded = [...form.getValues("excluded")];
    excluded.splice(index, 1);
    form.setValue("excluded", excluded);
  };

  const addImage = () => {
    if (imageInput.trim() && !form.getValues("images").includes(imageInput)) {
      const currentImages = form.getValues("images") || [];
      form.setValue("images", [...currentImages, imageInput.trim()]);
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    const images = [...form.getValues("images")];
    images.splice(index, 1);
    form.setValue("images", images);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Package</h1>
          <p className="text-muted-foreground">Fill in the details to create a new travel package</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of your package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Himalayan Adventure Trek" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="e.g., Gangtok, Sikkim" className="pl-10" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="trekking">Trekking</SelectItem>
                          <SelectItem value="sightseeing">Sightseeing</SelectItem>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="wildlife">Wildlife</SelectItem>
                          <SelectItem value="pilgrimage">Pilgrimage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="challenging">Challenging</SelectItem>
                          <SelectItem value="difficult">Difficult</SelectItem>
                          <SelectItem value="extreme">Extreme</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="e.g., 5 days 4 nights" className="pl-10" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxPeople"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum People</FormLabel>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          type="number" 
                          min="1" 
                          className="pl-10" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (per person)</FormLabel>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          className="pl-10" 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Price (optional)</FormLabel>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          className="pl-10" 
                          {...field} 
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your package in detail..." 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of the package, including key attractions and experiences.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dates & Availability</CardTitle>
              <CardDescription>Set the availability period for this package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="date" className="pl-10" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="date" className="pl-10" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Package Highlights</CardTitle>
              <CardDescription>Add key highlights of your package</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g., Visit Tsomgo Lake" 
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                  />
                  <Button type="button" onClick={addHighlight}>
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
                
                {form.getValues("highlights")?.length > 0 && (
                  <div className="space-y-2">
                    {form.getValues("highlights").map((highlight, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                        <span>{highlight}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeHighlight(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
              <CardDescription>List what's included in the package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g., Accommodation" 
                    value={includedInput}
                    onChange={(e) => setIncludedInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIncluded())}
                  />
                  <Button type="button" onClick={addIncluded}>
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
                
                {form.getValues("included")?.length > 0 && (
                  <div className="space-y-2">
                    {form.getValues("included").map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                        <span>{item}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeIncluded(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">What's Not Included (optional)</h4>
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g., Personal expenses" 
                    value={excludedInput}
                    onChange={(e) => setExcludedInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addExcluded())}
                  />
                  <Button type="button" variant="outline" onClick={addExcluded}>
                    <Plus className="h-4 w-4 mr-2" /> Add
                  </Button>
                </div>
                
                {form.getValues("excluded")?.length > 0 && (
                  <div className="space-y-2">
                    {form.getValues("excluded").map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                        <span>{item}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeExcluded(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Package Images</CardTitle>
              <CardDescription>Add high-quality images of the destination and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Paste image URL" 
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                  />
                  <Button type="button" onClick={addImage}>
                    <Image className="h-4 w-4 mr-2" /> Add Image
                  </Button>
                </div>
                
                {form.getValues("images")?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {form.getValues("images").map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image} 
                          alt={`Package image ${index + 1}`} 
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm" 
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md">
                    <Image className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      No images added yet. Add some beautiful images to showcase your package.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Feature this package</FormLabel>
                        <FormDescription>
                          Featured packages appear at the top of search results and on the homepage.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Make this package active</FormLabel>
                        <FormDescription>
                          Inactive packages won't be visible to customers.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Package'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}