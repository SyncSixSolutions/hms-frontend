import React, { useState, useEffect } from "react";
import {
    Button,
    Input,
    Card,
    Dropdown,
    CardContent,
} from "../../../components/ui";
import { Plus, Minus, Baby, Bed, User } from "lucide-react";
import { NavBarComponent } from "../../../components/layout";

const RoomCounter = ({ count, setCount }) => (
    <div className="flex items-center gap-2">
        <Button
            variant="border"
            onClick={() => setCount(Math.max(0, count - 1))}
            className="h-8 w-8 p-0 flex items-center justify-center"
        >
            <div>
                <Minus className="h-5 w-5 text-primary hover:text-white" />
            </div>
        </Button>
        <span className="w-8 text-center">{count}</span>
        <Button
            variant="border"
            onClick={() => setCount(count + 1)}
            className="h-8 w-8 p-0 flex items-center justify-center"
        >
            <div>
                <Plus className="h-5 w-5 text-primary hover:text-white" />
            </div>
        </Button>
    </div>
);

const ShowRooms = () => {
    const [doubleRoomCount, setDoubleRoomCount] = useState(0);
    const [checkindate, setCheckindate] = useState("");
    const [checkoutdate, setCheckoutdate] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedGuests, setSelectedGuests] = useState("");
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Simulate fetching data from backend
        const fetchRooms = async () => {
            const data = [
                {
                    id: "double-12",
                    title: "Double Room",
                    subtitle: "The President",
                    description: "Includes English breakfast, free Wi-Fi, and VAT.",
                    bed: "1 Double bed",
                    guests: "2 Guests",
                    price: 110,
                    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop",
                    offers: [
                        "Two nights accommodation in a single room (Friday & Saturday)",
                        "Two full English breakfasts",
                        "Two 3 course meals - lunch or dinner"
                    ],
                    stayPeriod: "1–10 November",
                    bookBy: "1–10 November",
                    discount: "30% Off",
                    rateType: "Standard rate"
                },
                {
                    id: "luxury-14",
                    title: "Luxury Suite",
                    subtitle: "The Royal Lounge",
                    description: "Enjoy the best luxury with private balcony and breakfast included.",
                    bed: "1 King bed",
                    guests: "4 Guests",
                    price: 250,
                    image: "https://images.unsplash.com/photo-1559599238-df4e3c5b46d2?w=300&h=200&fit=crop",
                    offers: [
                        "Complimentary mini-bar",
                        "Evening turndown service",
                        "Private lounge access"
                    ],
                    stayPeriod: "15–20 November",
                    bookBy: "10 November",
                    discount: "20% Off",
                    rateType: "Premium rate"
                }
            ];
            setRooms(data);
        };

        fetchRooms();
    }, []);

    const handleSearch = () => {
        console.log({
            checkindate,
            checkoutdate,
            selectedRoom,
            selectedGuests,
        });
        // Add filter logic if needed
    };

    return (
        <div>
            <NavBarComponent
                role="guest"
                isAuthenticated={false}
                forWhat="signIn"
                activeLink="Rooms"
                onSignIn={() => console.log("Signing in...")}
                onSignUp={() => console.log("Signing up...")}
                onProfileClick={() => console.log("Profile clicked")}
                profileImageUrl="/path-to-user.png"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
                {/* Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardContent className="space-y-4 pt-4">
                            <div>
                                <label className="text-xs text-[#6B7280] font-montserrat">Check-in</label>
                                <Input type="date" value={checkindate} onChange={(e) => setCheckindate(e.target.value)} />
                            </div>
                            <div>
                                <label className="text-xs text-[#6B7280] font-montserrat">Check-out</label>
                                <Input type="date" value={checkoutdate} onChange={(e) => setCheckoutdate(e.target.value)} />
                            </div>

                            <Dropdown
                                label="Room"
                                options={rooms.map(room => ({ label: `${room.title} - ${room.subtitle}`, value: room.id }))}
                                selected={selectedRoom}
                                onSelect={setSelectedRoom}
                                placeholder="Select room"
                            />

                            <Dropdown
                                label="Guests"
                                options={[
                                    { label: "1 Adult", value: "1a" },
                                    { label: "2 Adults, 3 Children", value: "2a3c" },
                                    { label: "4 Adults", value: "4a" },
                                ]}
                                selected={selectedGuests}
                                onSelect={setSelectedGuests}
                                placeholder="Select guests"
                            />

                            <Button onClick={handleSearch}>Search</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3 space-y-6">
                    {rooms.map((room) => (
                        <Card key={room.id}>
                            <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-1/3 h-64">
                                    <img
                                        src={room.image}
                                        alt={room.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                <div className="flex-1 p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">{room.subtitle}</p>
                                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{room.title}</h2>
                                            <p className="text-gray-700 mb-4">{room.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Bed className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="font-medium">{room.bed}</p>
                                                <p className="text-sm text-gray-500">{room.guests}</p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">On request</p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-4 w-4 text-gray-500" />
                                                    <span className="text-xs text-gray-500">Extra bed<br />max age 16 years</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Baby className="h-4 w-4 text-gray-500" />
                                                    <span className="text-xs text-gray-500">Baby cot<br />max age 2 years</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>

                            <CardContent className="pt-0">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-700">{room.rateType}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-500">Rooms</span>
                                        <RoomCounter count={doubleRoomCount} setCount={setDoubleRoomCount} />
                                        <div className="text-right">
                                            <span className="text-2xl font-bold">£{room.price.toFixed(2)}</span>
                                            <span className="text-sm text-gray-500 ml-1">per night</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-4">
                                    <p className="text-gray-700 font-medium">Special Offers</p>
                                    <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                                        {room.offers.map((offer, i) => (
                                            <li key={i}>{offer}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex justify-between items-end mt-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                            </div>
                                            <span className="text-sm">Stay: {room.stayPeriod}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                            </div>
                                            <span className="text-sm">Book by: {room.bookBy}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                            </div>
                                            <span className="text-sm">Private offer rate: {room.discount}</span>
                                        </div>
                                    </div>
                                    <Button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2">
                                        Add to booking
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowRooms;
