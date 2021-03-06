import React, { useState } from "react";
import { useCaregivers, updateCaregiver, deleteCaregiver } from "../api";
import Loading from "../components/Loading";
import Button from "../components/Button";
import Filter from "../components/Filter";
import ReactStars from "react-rating-stars-component";
import Upload from "../components/Upload";

/*
* List caregiver's information on the page.
 */
export default function Caregivers() {
    const { loading, caregivers, error } = useCaregivers();
    if (loading) {
        return Loading();
    }
    if (error) {
        return <p>Something went wrong: {error.message}</p>;
    }
    // Display a list of the caregivers
    return (
        <div>
            <div className={"list_style"}>
                <div id={"filter_place"}><Filter/></div>
                <div id={"join_button"}>
                </div>
                <div id="careGiverList">
                    {caregivers.map(caregiver => (
                        <div className="list">
                            <button id="listbutton" onClick={()=>getCaregiverInformation(caregiver)}>
                                <div className="block_list">
                                <div>
                                    <div id="name">
                                        {caregiver.first_name} {caregiver.last_name}<br/><br/>
                                    </div>
                                    <div id="intro">
                                        introduction : {caregiver.introduction}
                                    </div>
                                    <div id="as">
                                Address : {caregiver.address} &nbsp;&nbsp;
                                Salary : {caregiver.salary}<br/><br/>
                                </div>
                                <ReactStars
                                    count={caregiver.rate}
                                    size={24}
                                    edit={false}
                                    half={true}

                                    color1={'#ffd700'} />
                                    </div>
                                <img className={"photo"}  src={caregiver.image} ></img>
                                    </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/*
* Store the caregiver's information and take it to the next page.
 */
export function getCaregiverInformation(caregiver){
    console.log(caregiver);
    console.log(caregiver.username);
    var string_type = JSON.stringify(caregiver);
    console.log(string_type);
    //set the information by using sessionStorage.
    sessionStorage.setItem("personalInformation",string_type);
    window.location.assign(`https://healthnextdoor.herokuapp.com/CaregiverInformation/${caregiver.username}`);
}

/*
*  list the information on personal profile which can be revised by users.
 */
export function Caregiver(caregiver) {
    const { first_name, last_name, gender, introduction, username, age, address, salary, working_experience,
        contact_information, image} = caregiver;

    return (
        <div className='postingProfile'>
            <div className='profileImage'>
                <img id={"profile_photo"} height='100px' width='100px' src={image} ></img><br/><br/>
            </div>
            <table id='profileOuter'>
                <tr><td>Firstname:</td> <td>{first_name}</td></tr>
                <tr><td>Lastname: </td> <td>{last_name}</td></tr>
                <tr><td>Gender: </td> <td>{gender}</td></tr>
                <tr><td>Age: </td> <td> {age}</td></tr>
                <tr><td>Address: </td> <td> {address}</td></tr>
                <tr><td>Expected salary: </td> <td> {salary}</td></tr>
                <tr><td>Working experience: </td> <td> {working_experience}</td></tr>
                <tr><td>Contact information: </td> <td>{contact_information}</td></tr>
                <tr><td>Introduction: </td> <td width={'300px'}>{introduction}</td></tr>
            <button className={"btn-success"} onClick={()=>updateProfile(username)}>
                update
            </button>
            </table>
            <div className={"uploadStyle"}>
                <Upload/>
            </div>
        </div>
    );
}

/*
* Use filter to select suitable caregivers.
 */
export function SubmitFilter(caregivers) {
    console.log(caregivers);
    var address = document.getElementById("address");
    var min_age = document.getElementById("min_age");
    var max_age = document.getElementById("max_age");
    var working_experience = document.getElementById("working_experience");
    var salary = document.getElementById("salary");
    var male = document.getElementById("gender_male");
    var female = document.getElementById("gender_female");
    var gender_result = caregivers;
    // To check whether the input is number.
    var reg=/^[0-9]+.?[0-9]*$/;
    // Search caregivers by testing the limitations.
    if (min_age.value || max_age.value) {
        if(!reg.test(min_age.value) || !reg.test(max_age.value)) {
            alert("please input valid age range!");
            return;
        }
    }

    if(working_experience.value) {
        if(!reg.test(working_experience.value)) {
            alert("please input valid working experience!");
            return;
        }
    }

    if (male && female) {
        if (male.checked && !female.checked) {
            gender_result = caregivers.filter(function (caregiver) {
                return caregiver.gender === "male";
            });
        }
        if (!male.checked && female.checked) {
            gender_result = caregivers.filter(caregivers =>
                caregivers.gender === "female"
            );
        }
    }

    if (address.value) {
        var address_result = gender_result.filter(function (caregiver) {
            return caregiver.address === address.value;
        });
    } else {
        address_result = gender_result;
    }

    if(min_age.value || max_age.value) {

        var age_result = address_result.filter(function (caregiver) {
            var age = parseInt(caregiver.age);
            if(!min_age.value) {
                return age >= min_age.value;
            }
            if(!max_age.value) {
                return age >= min_age.value;
            } else {
                return age >= min_age.value && age <= max_age.value;
            }
        });
    } else {
        age_result = address_result;
    }

    if(salary.value !== "1") {
        var salary_result = age_result.filter(function (caregiver) {
            if (salary.value === "2") {
                return caregiver.salary < 20;
            }
            if (salary.value === "3") {
                return caregiver.salary > 20 && caregiver.salary < 40;
            }
            if (salary.value === "4") {
                return caregiver.salary > 40 && caregiver.salary < 60;
            }
            if (salary.value === "5") {
                return caregiver.salary > 60;
            }
        });
    } else {
        salary_result = age_result;
    }

    if (working_experience.value) {
        var working_experience_result = salary_result.filter(function (caregiver) {
            return caregiver.working_experience > working_experience.value;
        });
    } else {
        working_experience_result = salary_result;
    }
    console.log(working_experience_result);
    var string_type = JSON.stringify(working_experience_result);
    console.log(string_type);
    sessionStorage.setItem("targetData",string_type);
    window.location.href = "SearchCaregivers"

}

function updateProfile() {
    window.location.assign(`https://healthnextdoor.herokuapp.com/updateProfile`);
}