import { useState } from "react";
import { Mail, Lock, User, Phone } from "lucide-react"; // Import the icons you want

export default function AdminAuthCard() {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className="authpage-right-admin-container">
            <div className="authpage-right-admin-header">
                <div className="authpage-right-title">Admin Portal</div>
                <div className="authpage-right-subtitle">
                    {isSignup
                        ? "Sign up to manage programs and trainers"
                        : "Sign in to manage programs and trainers"}
                </div>
            </div>
            <div className="authpage-right-admin-content">
                <div className={`authpage-right-admin-form ${isSignup ? "grid-layout" : ""}`}>
                    {isSignup && (
                        <>
                            <div className="authpage-right-admin-name">
                                <label className="authpage-right-admin-name-label">
                                    <User color="#374151" size={"1.2rem"} style={{ marginRight: "8px" }} />
                                    Name
                                </label>
                                <input
                                    className="authpage-right-admin-name-input"
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div className="authpage-right-admin-phone">
                                <label className="authpage-right-admin-phone-label">
                                    <Phone color="#374151" size={"1.2rem"} style={{ marginRight: "8px" }} />
                                    Phone
                                </label>
                                <input
                                    className="authpage-right-admin-phone-input"
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="authpage-right-admin-email">
                        <label className="authpage-right-admin-email-label">
                            <Mail color="#374151" size={"1.2rem"} style={{ marginRight: "8px" }} />
                            Email
                        </label>
                        <input
                            className="authpage-right-admin-email-input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="authpage-right-admin-password">
                        <label className="authpage-right-admin-password-label">
                            <Lock color="#374151" size={"1.2rem"} style={{ marginRight: "8px" }} />
                            Password
                        </label>
                        <input
                            className="authpage-right-admin-password-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`authpage-right-admin-${isSignup ? "signup" : "login"}-button`}
                    style={{
                        marginTop: "1.4rem",
                        width: "100%",
                        borderRadius: "10px"
                    }}
                >
                    {isSignup ? "Sign Up" : "Sign In"}
                </button>
                <div className="authpage-right-admin-toggle">
                    {isSignup ? (
                        <>
                            Already have an account?{" "}
                            <span
                                onClick={() => setIsSignup(false)}
                                className="authpage-right-admin-signin-link"
                            >
                                Sign In
                            </span>
                        </>
                    ) : (
                        <>
                            Don&apos;t have an account?{" "}
                            <span
                                onClick={() => setIsSignup(true)}
                                className="authpage-right-admin-signup-link"
                            >
                                Sign Up
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
