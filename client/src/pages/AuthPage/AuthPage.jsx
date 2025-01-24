import "./authpage.css";
import { useState } from "react";
import TrainerIllustration from "../../assets/illustrations/employee-works-on-deadlines.svg";
import AdminIllustration from "../../assets/illustrations/businessman-is-doing-market-research.svg";

export default function AuthPage() {
    const [isTrainer, setIsTrainer] = useState(false);

    const toggleRole = () => {
        setIsTrainer(!isTrainer);
    };

    return (
        <div className="authpage-container">
            <div className="authpage-container-grid" />
            <div className="authpage-content">
                <div className={`authpage-left ${isTrainer ? 'trainer-bg' : 'admin-bg'}`}>
                    {
                        isTrainer ? (
                            <div className="authpage-left-trainer-top">
                                <img
                                    src={TrainerIllustration}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                    className={isTrainer ? "trainer-illus-active" : ""}
                                    alt="Trainer Illustration"
                                />
                            </div>
                        ) : (
                            <div className="authpage-left-admin-top">
                                <img
                                    src={AdminIllustration}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                    className={!isTrainer ? "admin-illus-active" : ""}
                                    alt="Admin Illustration"
                                />
                            </div>
                        )
                    }
                    <div className="authpage-left-bottom">
                        <div className="authpage-left-title">TrackWise</div>
                        <div className="authpage-left-subtitle">Keep Your Progress On Track Every Day, Achieve Your Goals.</div>
                    </div>
                </div>
                <div className="authpage-right">
                    <div className="role-switch-container">
                        <div
                            className={`trainer-switch-button ${isTrainer ? 'active' : ''}`}
                            onClick={toggleRole}
                        >
                            Trainer
                        </div>
                        <div
                            className={`admin-switch-button ${!isTrainer ? 'active' : ''}`}
                            onClick={toggleRole}
                        >
                            Admin
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
