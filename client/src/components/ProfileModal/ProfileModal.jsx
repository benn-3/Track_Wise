/* eslint-disable react/prop-types */
import { User, Mail, Phone, Calendar, MapPin, Star, Users, X } from 'lucide-react';
import "./profilemodal.css";

export default function ProfileModal({ user, role, requestClose }) {
    return (
        <div className={`profile-modal ${role === "admin" ? "admin" : "trainer"}`}>

            <div className="modal-header">
                <div style={{
                    display: "flex",
                    gap:"1rem"
                }}>
                    <h2>Profile Details - </h2>
                    <h2 style={{
                        textTransform: "capitalize"
                    }}>{role}</h2>
                </div>
                <X size={"1.5rem"} style={{ cursor: "pointer" }} onClick={() => requestClose()} />
            </div>

            {role === "admin" ? (
                <div className="profile-info">
                    <div><User size={"1.5rem"} /> <strong>Name:</strong> {user.name}</div>
                    <div><Mail size={"1.5rem"} /> <strong>Email:</strong> {user.email}</div>
                    <div><Phone size={"1.5rem"} /> <strong>Phone:</strong> {user.phone}</div>
                </div>
            ) : (
                <div className="profile-info">
                    <div><User size={"1.5rem"} /> <strong>Name:</strong> {user.name}</div>
                    <div><Mail size={"1.5rem"} /> <strong>Email:</strong> {user.email}</div>
                    <div><Phone size={"1.5rem"} /> <strong>Phone:</strong> {user.phone}</div>
                    <div><Calendar size={"1.5rem"} /> <strong>Age:</strong> {user.age}</div>
                    <div><MapPin size={"1.5rem"} /> <strong>Address:</strong> {user.address}</div>
                    <div><Star size={"1.5rem"} /> <strong>Specialization:</strong> {user.specialization.join(', ')}</div>
                    <div><Users size={"1.5rem"} /> <strong>Skills:</strong> {user.skills.join(', ')}</div>
                    <div><Users size={"1.5rem"} /> <strong>Programs Assigned:</strong> {user.programsAssigned.length > 0 ? user.programsAssigned.join(', ') : 'None'}</div>
                    <div><Users size={"1.5rem"} /> <strong>Availability:</strong> {user.availability}</div>
                </div>
            )}
        </div>
    );
}
