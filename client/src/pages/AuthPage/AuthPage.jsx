import "./authpage.css";
import { useState } from "react";
import TrainerIllustration from "../../assets/illustrations/employee-works-on-deadlines.svg";
import AdminIllustration from "../../assets/illustrations/businessman-is-doing-market-research.svg";
import TrainerAuthCard from "../../components/TrainerAuthCard/TrainerAuthCard";
import AdminAuthCard from "../../components/AdminAuthCard/AdminAuthCard";

export default function AuthPage() {
    const [isTrainer, setIsTrainer] = useState(false);

    const toggleRole = () => {
        setIsTrainer(!isTrainer);
    };

    return (
        <div className="authpage-container">
            <div className="authpage-container-grid" />
            <div className="role-switch-container">
                <div
                    className={`admin-switch-button ${!isTrainer ? "active" : ""}`}
                    onClick={toggleRole}
                >
                    Admin
                </div>
                <div
                    className={`trainer-switch-button ${isTrainer ? "active" : ""}`}
                    onClick={toggleRole}
                >
                    Trainer
                </div>
            </div>
            <div className="authpage-content">
                <div
                    className={`authpage-left ${isTrainer ? "trainer-bg" : "admin-bg"}`}
                >
                    <div className={isTrainer ? "authpage-left-trainer-top" : "authpage-left-admin-top"}>
                        <img
                            loading="lazy"
                            src={isTrainer ? TrainerIllustration : AdminIllustration}
                            className={isTrainer ? "trainer-illus-active" : "admin-illus-active"}
                            alt={isTrainer ? "Trainer Illustration" : "Admin Illustration"}
                        />
                    </div>
                    <div className="authpage-left-bottom">
                        <div className="authpage-left-title">
                            {isTrainer ? "Shape Futures" : "Lead the Way"}
                        </div>
                        <div className="authpage-left-subtitle">
                            {isTrainer
                                ? "Inspire and guide learners toward excellence."
                                : "Strategize, manage, and drive impactful results."}
                        </div>
                    </div>
                </div>
                <div className="authpage-right">
                    {isTrainer ? <TrainerAuthCard /> : <AdminAuthCard />}
                </div>
            </div>
        </div>
    );
}
