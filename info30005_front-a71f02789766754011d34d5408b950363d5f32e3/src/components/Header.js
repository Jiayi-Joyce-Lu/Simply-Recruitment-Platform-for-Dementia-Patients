import React, { useState } from "react";

import { addCaregiver } from "../api";
import Button from "../components/Button";

export default function Header() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [introduction, setIntroduction] = useState("");
    const username = window.sessionStorage.getItem("username");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [salary, setSalary] = useState("");
    const [working_experience, setWorking_experience] = useState("");
    const [contact_information, setContact_information] = useState("");
    function onSubmit() {
        addCaregiver({
            first_name,
            last_name,
            gender,
            introduction,
            username,
            age,
            address,
            salary,
            working_experience,
            contact_information,
        });
    }

    return (
        <div className="addCaregiver">

            <form>
                <p>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={first_name}
                        onChange={event => {
                            setFirstName(event.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={last_name}
                        onChange={event => {
                            setLastName(event.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="gender"
                        name="gender"
                        value={gender}
                        onChange={event => {
                            setGender(event.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="introduction"
                        name="introduction"
                        value={introduction}
                        onChange={event => {
                            setIntroduction(event.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="age"
                        name="age"
                        value={age}
                        onChange={event => {
                            setAge(event.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="address"
                        name="address"
                        value={address}
                        onChange={event => {
                            setAddress(event.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="salary"
                        name="salary"
                        value={salary}
                        onChange={event => {
                            setSalary(event.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="working experience"
                        name="working_experience"
                        value={working_experience}
                        onChange={event => {
                            setWorking_experience(event.target.value);
                        }}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="contact information"
                        name="contact_information"
                        value={contact_information}
                        onChange={event => {
                            setContact_information(event.target.value);
                        }}
                    />
                </p>
                <Button className={"btn-success"} onClick={onSubmit}>
                    Save
                </Button>
            </form>
        </div>
    );
}
