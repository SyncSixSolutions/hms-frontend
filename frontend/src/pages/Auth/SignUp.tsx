import React, { useState } from 'react';
import { Button, Input, Card, Dropdown } from '../../components/ui';
import { FcGoogle } from 'react-icons/fc';
import { NavBarComponent } from '../../components/layout';
import Footer from '../../components/layout/Footer';

const SignUp: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignIn = () => console.log('Sign In');
    const handleSignUp = () => {
        console.log({ fullName, email, country, password, confirmPassword });
    };

    const countries = [
        { label: 'Sri Lanka', value: 'sri-lanka' },
        { label: 'India', value: 'india' },
        { label: 'United States', value: 'usa' },
        { label: 'Australia', value: 'australia' },
        { label: 'United Kingdom', value: 'uk' },
    ];

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white">
            <NavBarComponent
                role="guest"
                isAuthenticated={false}
                forWhat="signIn"
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
            />

            {/* Sign Up Card */}
            <div className="flex flex-col items-center justify-center flex-grow py-8 px-4">
                <Card className="w-full max-w-lg p-10 shadow-md rounded-3xl">
                    <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>
                    <p className="text-center text-sm text-gray-500 mb-6">Create your account at Ocean View Resort</p>

                    <Button
                        variant="secondary"
                        className="w-full flex items-center justify-center space-x-2 mb-4"
                        onClick={() => alert('Continue with Google')}
                    >
                        <FcGoogle size={20} />
                        <span>Continue with Google</span>
                    </Button>

                    <div className="text-center text-xs text-gray-400 mt-4">OR</div>

                    <div className="mt-2">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <Input
                            label="Email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div>
                            <Dropdown
                                options={countries}
                                label='Country'
                                selected={country}
                                onSelect={(value) => setCountry(value)}
                                placeholder="Select your country"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-4">
                            <div className="flex-1">
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="my-4">
                        <Button variant="primary" className="w-full" onClick={handleSignUp}>
                            Sign Up
                        </Button>
                    </div>

                    <p className="text-center text-sm mt-4">
                        Already have an account?{' '}
                        <a href="/signin" className="text-indigo-600 hover:text-indigo-400">
                            Sign In
                        </a>
                    </p>
                </Card>
            </div>

            <Footer />
        </div>
    );
};

export default SignUp;
