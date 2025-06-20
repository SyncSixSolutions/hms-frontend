import React, { useState } from 'react';
import { Button, Input, Card } from '../../components/ui';
import { FcGoogle } from 'react-icons/fc';
import { NavBarComponent } from '../../components/layout';
import Footer from '../../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { signin, SignInPayload, AuthResponse } from '../../utility/Authentication';
import { getDecodedToken  } from '../../utility/jwtDecode';


const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {navigate('/signin');}
    const handleSignUp = () => {navigate('/signup');}

    const handleLogin = async () => {
    const payload: SignInPayload = {
        email: email, 
        password: password, 
    };

  try {
    const response = await signin(payload); 
    const data: AuthResponse = response.data;

    localStorage.setItem('token', data.access_token);

    const decode = getDecodedToken();

    console.log('Logged in as:', decode?.role);
    navigate('/dashboard-client'); // or any route
  } catch (error) {
    console.error('Sign In Error:', error);
    alert('Sign In Failed. Please check your credentials.');
  }
};

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white">
            <NavBarComponent
                role="guest"
                isAuthenticated={false}
                forWhat="signUp"
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
            />

            {/* Centered Card */}
            <div className="flex flex-col items-center justify-center flex-grow px-4 pt-4 sm:pt-0">
                <Card className="w-full max-w-lg p-8 sm:p-10 rounded-3xl shadow-md bg-bg">
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-bold text-text">Sign In</h2>
                        <p className="text-sm text-muted mt-1">Welcome to Ocean View Resort</p>
                    </div>

                    <Button
                        variant="secondary"
                        className="w-full flex items-center justify-center gap-2 mb-4"
                        onClick={() => alert('Continue with Google')}
                    >
                        <FcGoogle size={20} />
                        <span>Continue with Google</span>
                    </Button>

                    <div className="relative text-center my-4">
                        <span className="text-xs text-muted">OR</span>
                    </div>

                    <div className="space-y-2">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        variant="primary"
                        className="w-full mt-6"
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>

                    <p className="text-center text-sm mt-6 text-muted">
                        New user?{' '}
                        <a 
                            onClick={handleSignUp}
                            className="text-primary hover:text-indigo-400 hover:cursor-pointer"
                        >
                            Create an account
                        </a>
                    </p>
                </Card>
            </div>

            <Footer />
        </div>
    );
};

export default SignIn;
