import React, { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useState } from 'react/cjs/react.development';
import { useAuth } from '../../../auth/auth';

const AddAddress = ({ setAddressAdded }) => {

    const { user } = useAuth()

    const [loading, setLoading] = useState(false)

    const [districts, setBdDistricts] = useState(null)
    const [inputCity, setInputCity] = useState(null)
    const [inputZip, setInputZip] = useState(null)
    const [inputRoadNo, setInputRoadNo] = useState(null)
    const [inputPhone, setInputPhone] = useState(null)

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedDivision, setSelectedDivision] = useState(null)
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [inputTerms, setInputTerms] = useState(false)
    const [selectDivision, setSelectDivision] = useState(false)
    const [selectDistrict, setSelectDistrict] = useState(false)
    const [availableSave, setAvailableSave] = useState(false)


    // Get all districts data
    useEffect(() => {
        fetch('https://arcane-sierra-30035.herokuapp.com/districts')
            .then(res => res.json())
            .then(data => setBdDistricts(data))
    }, [])


    // All select option validation
    useEffect(() => {
        if (selectedCountry === 'bd') {
            setSelectDivision(true)
            setSelectDistrict(false)
        } else if (selectedCountry === 'bd' || selectedDivision) {
            setSelectDivision(true)
            setSelectDistrict(true)
        } else {
            setSelectDivision(false)
            setSelectDistrict(false)
        }
    }, [selectedCountry, selectedDivision, selectedDistrict, selectDivision, selectDistrict])

    // Add a users address
    const addAnAddress = (e) => {
        setLoading(true)
        fetch('https://arcane-sierra-30035.herokuapp.com/add-address', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                country: selectedCountry,
                division: selectedDivision,
                district: selectedDistrict,
                city: inputCity,
                zip: inputZip,
                Road: inputRoadNo,
                Phone: inputPhone,
            })
        })
            .then(data => {
                if (data?.status === 200) {
                    setAddressAdded(true)
                    setInputTerms(false)
                    e.target.reset()
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
        e.preventDefault()
    }


    // Save Address btn available
    useEffect(() => {
        if (districts && inputCity && inputZip && inputRoadNo && inputPhone?.length > 9 && selectedCountry && selectedDivision && selectedDistrict && inputTerms === true) {
            setAvailableSave(true)
        } else {
            setAvailableSave(false)
        }
    }, [
        districts,
        inputCity,
        inputZip,
        inputRoadNo,
        inputPhone,
        selectedCountry,
        selectedDivision,
        selectedDistrict,
        inputTerms
    ])

    console.log(availableSave)

    return (
        <div className="addAddress mt-5">
            <h5>Add an address</h5>
            {
                loading ?
                    <div className="addAddressLoader text-center my-5">
                        <span>Adding...</span>
                    </div>
                    :
                    <form onSubmit={addAnAddress} class="row g-3 mt-2 checkoutShippingAddress">
                        <div class="col-md-6">
                            <label for="checkoutFormName" class="form-label">Full Name <span className="text-danger">*</span></label>
                            <input type="text" class="form-control" value={user?.name} id="checkoutFormName" required />
                        </div>
                        <div class="col-md-6">
                            <label for="checkoutFormEmail" class="form-label">Email <span className="text-danger">*</span></label>
                            <input type="email" class="form-control" value={user?.email} id="checkoutFormEmail" required />
                        </div>
                        <div class="col-md-4">
                            <label for="checkoutFormCountry" class="form-label">Country <span className="text-danger">*</span></label>
                            <select onChange={(e) => setSelectedCountry(e.target.value)} class="form-select" id="checkoutFormCountry" required >
                                <option selected disabled value="">Choose...</option>
                                <option value="bd">Bangladesh</option>
                                {/* 
                    <option>India</option>
                    <option>Pakistan</option>
                    <option>Nepal</option>
                    <option>Sri Lanka</option>
                    */}
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="checkoutFormDivision" class="form-label">Division <span className="text-danger">*</span></label>
                            <select onChange={(e) => setSelectedDivision(e.target.value)} class="form-select" id="checkoutFormDivision" required>
                                <option selected disabled value="">Choose...</option>
                                {
                                    selectDivision ?
                                        <>
                                            {
                                                districts ?
                                                    <>
                                                        {
                                                            districts.map(dt => (
                                                                <option value={dt.name}>{dt.name}</option>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </>
                                        :
                                        <option disabled value="">Please Choose country</option>
                                }
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="checkoutFormDistrict" class="form-label">District <span className="text-danger">*</span></label>
                            <select onChange={(e) => setSelectedDistrict(e.target.value)} class="form-select" id="checkoutFormDistrict" required >
                                <option selected disabled value="">Choose...</option>
                                {
                                    selectDivision && setSelectDistrict ?
                                        <>
                                            {
                                                districts ?
                                                    <>
                                                        {
                                                            districts.find(dt => dt.name === selectedDivision)?.districts.map(dt => (
                                                                <option value={dt}>{dt}</option>
                                                            ))
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </>
                                        :
                                        <option disabled value="">Please Choose country & division</option>
                                }
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="checkoutFormCity" class="form-label">City <span className="text-danger">*</span></label>
                            <input onChange={(e) => setInputCity(e.target.value)} type="text" class="form-control" id="checkoutFormCity" required />
                        </div>
                        <div class="col-md-2">
                            <label for="checkoutFormZip" class="form-label">Zip <span className="text-danger">*</span></label>
                            <input onChange={(e) => setInputZip(e.target.value)} type="number" class="form-control" id="checkoutFormZip" required />
                        </div>
                        <div class="col-md-2">
                            <label for="checkoutFormRoad" class="form-label">Road <span className="text-danger">*</span></label>
                            <input onChange={(e) => setInputRoadNo(e.target.value)} type="number" class="form-control" id="checkoutFormRoad" required />
                        </div>
                        <div class="col-md-4">
                            <label for="checkoutFormPhone" class="form-label">Phone  <span className="text-danger">*</span></label>
                            <input onChange={(e) => setInputPhone(e.target.value)} type="number" class="form-control" id="checkoutFormPhone" required />
                        </div>
                        <div class="col-md-10 mt-5">
                            <div class="form-check">
                                <input onClick={() => inputTerms ? setInputTerms(false) : setInputTerms(true)} class="form-check-input" type="checkbox" value="" id="inputTerms" required />
                                <label class="form-check-label" for="inputTerms">Agree to terms and conditions</label>
                            </div>
                        </div>
                        <div class="col-md-2 mt-5">
                            <button class="btn btn-primary px-4 ms-3" style={{ boxShadow: "none" }} type="submit" id="add-address-btn" disabled={availableSave ? "" : "disabled"}>Save</button>
                        </div>
                    </form>
            }
        </div>
    );
};

export default AddAddress;