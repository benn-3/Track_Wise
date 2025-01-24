import { ArrowLeft, ArrowRight, Calendar, Code, Lock, Mail, MapPin, Phone, User, UserPen } from "lucide-react";
import { useState } from "react";

export default function TrainerAuthCard() {
    const [isSignup, setIsSignup] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        gender: '',
        address: '',
        specialization: '',
        email: '',
        password: '',
    });

    const [currentPage, setCurrentPage] = useState(1);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleBack = () => {
        setCurrentPage(currentPage - 1);
    };

    const fieldsPerPage = 3;
    const startIndex = (currentPage - 1) * fieldsPerPage;
    const currentFields = Object.keys(formData).slice(startIndex, startIndex + fieldsPerPage);

    return (
        <div className="authpage-right-trainer-container">
            <div className="authpage-right-trainer-header">
                <div className="authpage-right-title">Trainer Portal</div>
                <div className="authpage-right-subtitle">
                    {isSignup
                        ? "Sign up to inspire and guide learners"
                        : "Sign in to access your dashboard"}
                </div>
            </div>
            <div className="authpage-right-trainer-content">
                <div className="authpage-right-trainer-form">
                    {!isSignup && (
                        <>
                            <div className="authpage-right-trainer-email-wrapper">
                                <label className="authpage-right-trainer-email-label">
                                    <Mail size={"1.2rem"} color="#374151" style={{ marginRight: '8px' }} /> Email
                                </label>
                                <input
                                    className="authpage-right-trainer-email-input"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="authpage-right-trainer-password-wrapper">
                                <label className="authpage-right-trainer-password-label">
                                    <Lock size={"1.2rem"} color="#374151" style={{ marginRight: '8px' }} /> Password
                                </label>
                                <input
                                    className="authpage-right-trainer-password-input"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {isSignup && currentFields.includes("name") && (
                        <div className="authpage-right-trainer-name-wrapper">
                            <label className="authpage-right-trainer-name-label">
                                <User color="#374151" size={"1.2rem"} style={{ marginRight: '8px' }} /> Name
                            </label>
                            <input
                                className="authpage-right-trainer-name-input"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                required
                            />
                        </div>
                    )}

                    {isSignup && currentFields.includes("email") && (
                        <div className="authpage-right-trainer-email-wrapper">
                            <label className="authpage-right-trainer-email-label">
                                <Mail color="#374151" size={"1.2rem"} style={{ marginRight: '8px' }} /> Email
                            </label>
                            <input
                                className="authpage-right-trainer-email-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                    )}

                    {isSignup && currentFields.includes("phone") && (
                        <div className="authpage-right-trainer-phone-wrapper">
                            <label className="authpage-right-trainer-phone-label">
                                <Phone color="#374151" size={"1.2rem"} style={{ marginRight: '8px' }} /> Phone
                            </label>
                            <input
                                className="authpage-right-trainer-phone-input"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                required
                            />
                        </div>
                    )}

                    {isSignup && currentFields.includes("age") && (
                        <div className="authpage-right-trainer-age-wrapper">
                            <label className="authpage-right-trainer-age-label">
                                <Calendar color="#374151" size={"1.2rem"} style={{ marginRight: '8px' }} /> Age
                            </label>
                            <input
                                className="authpage-right-trainer-age-input"
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Age"
                                required
                            />
                        </div>
                    )}

                    {isSignup && currentFields.includes("gender") && (
                        <div className="authpage-right-trainer-gender-wrapper">
                            <label className="authpage-right-trainer-gender-label">
                                <UserPen color="#374151" size={"1.2rem"} style={{ marginRight: '8px' }} /> Gender
                            </label>
                            <select
                                className="authpage-right-trainer-gender-select"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    )}

                    {isSignup && currentFields.includes("address") && (
                        <div className="authpage-right-trainer-address-wrapper">
                            <label className="authpage-right-trainer-address-label">
                                <MapPin color="#374151" size={"1.2rem"} style={{ marginRight: '8px' }} /> Address
                            </label>
                            <textarea
                                className="authpage-right-trainer-address-textarea"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                                required
                            ></textarea>
                        </div>
                    )}

                    {isSignup && currentFields.includes("specialization") && (
                        <div className="authpage-right-trainer-specialization-wrapper">
                            <label className="authpage-right-trainer-specialization-label">
                                <Code color="#374151" size={"1.2rem"} style={{ marginRight: '8px' }} /> Specialization
                            </label>
                            <input
                                className="authpage-right-trainer-specialization-input"
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                placeholder="Specialization (e.g., Python, Javascript)"
                                required
                            />
                        </div>
                    )}

                    {isSignup && currentFields.includes("password") && (
                        <div className="authpage-right-trainer-confirm-password-wrapper">
                            <label className="authpage-right-trainer-confirm-password-label">
                                <Lock color="#374151" size={"1.2rem"} style={{ marginRight: '8px' }} />Password
                            </label>
                            <input
                                className="authpage-right-trainer-confirm-password-input"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                required
                            />
                        </div>
                    )}
                </div>

                <div className="authpage-right-trainer-navigation">
                    {isSignup && (
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentPage === 1}
                            aria-label="Back"
                        >
                            <ArrowLeft size={24} />
                        </button>
                    )}
                    {isSignup && (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={currentPage * fieldsPerPage >= Object.keys(formData).length}
                            aria-label="Next"
                        >
                            <ArrowRight size={24} />
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className={`authpage-right-trainer-${isSignup ? "signup" : "login"}-button`}
                    style={{
                        marginTop: "1rem",
                        width: "100%",
                        borderRadius: "10px"
                    }}
                >
                    {isSignup ? "Sign Up" : "Sign In"}
                </button>

                <div className="authpage-right-trainer-toggle">
                    {isSignup ? (
                        <>
                            Already have an account?{" "}
                            <span
                                onClick={() => setIsSignup(false)}
                                style={{ cursor: "pointer", color: "blue" }}
                                className="signin-linking-button"
                            >
                                Sign In
                            </span>
                        </>
                    ) : (
                        <>
                            Don&apos;t have an account?{" "}
                            <span
                                onClick={() => setIsSignup(true)}
                                style={{ cursor: "pointer", color: "blue" }}
                                className="signup-linking-button"
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
