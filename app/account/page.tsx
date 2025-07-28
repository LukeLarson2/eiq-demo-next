"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, User, Receipt, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerInfo } from "@/lib/types";

// ExemptionIQ Customer Client Component import statement
import { ExemptionIqCustomerClient } from "exemption-iq";

export default function AccountPage() {
  // Example customer data model - Customer data should not be hard coded
  const customerInfo: CustomerInfo = {
    name: "Phillips-Kim",
    emailAddress: "grant87@arnold.com",
    addressLine1: "65029 Peterson Skyway Suite 666",
    phoneNumber: "205-118-7100x964",
    city: "New Bethville",
    country: "USA",
    postalCode: "16005",
    region: "NV",
  };

  const [editedCustomerInfo, setEditedCustomerInfo] = useState<CustomerInfo>({
    ...customerInfo,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [exemptionComplete, setExemptionComplete] = useState(false);

  // Example onComplete callback function
  const handleExemptionComplete = (status: boolean) => {
    setExemptionComplete(status);
    return true;
  };

  // Example button styles to match page themes
  const buttonStyles = JSON.stringify({
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    fontWeight: 500,
    fontSize: "0.875rem",
    transition: "background-color 150ms ease-in-out, opacity 150ms ease-in-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "#1f2937", // Tailwind's gray-800
    color: "#ffffff",
    cursor: "pointer",
    width: "100%",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would update the customer info in the database
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedCustomerInfo({ ...customerInfo });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/account" className="text-muted-foreground">
              My Account
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <CardTitle>{customerInfo.name}</CardTitle>
                <CardDescription className="mt-1">
                  {customerInfo.emailAddress}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                <Link
                  href="/account"
                  className="flex items-center justify-between w-full p-3 bg-secondary/50 font-medium"
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center justify-between w-full p-3 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center">
                    <Receipt className="h-4 w-4 mr-2" />
                    Orders
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <Button variant="outline" className="w-full gap-2">
                <LogOut className="h-4 w-4" />
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="account">Account Info</TabsTrigger>
              <TabsTrigger value="exemptions">Exemptions</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        Update your account details and contact information
                      </CardDescription>
                    </div>

                    {!isEditing && (
                      <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Company Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={editedCustomerInfo.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emailAddress">Email Address</Label>
                        <Input
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          value={editedCustomerInfo.emailAddress}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={editedCustomerInfo.phoneNumber}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="addressLine1">Address</Label>
                        <Input
                          id="addressLine1"
                          name="addressLine1"
                          value={editedCustomerInfo.addressLine1}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={editedCustomerInfo.city}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="region">State/Province</Label>
                        <Input
                          id="region"
                          name="region"
                          value={editedCustomerInfo.region}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={editedCustomerInfo.postalCode}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={editedCustomerInfo.country}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-2 mt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exemptions">
              <Card>
                <div className="p-4">
                  {/* ExemptionIQ Customer Client Component integration example */}
                  <ExemptionIqCustomerClient
                    customerCode="000001"
                    customerInfo={customerInfo}
                    state="Navada"
                    primaryColor="#2966B1"
                    onComplete={handleExemptionComplete}
                    framework="next"
                    buttonStyles={buttonStyles}
                    manualValidation={false}
                    showDownload={true}
                    environment="production"
                  />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
