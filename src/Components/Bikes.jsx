import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Bikes() {
    const [bikes, setBikes] = useState([]);
    const [brand, setBrand] = useState([]);
    const [bikeName, setBikeName] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedBike, setSelectedBike] = useState('');
    const [isSelectionDisabled, setIsSelectionDisabled] = useState(false);
    let emailid = useSelector((state) => state.data.userEmail);
    let userService = useSelector((state) => state.data.userService);
    
    useEffect(()=>{
        console.log(userService);
    },[userService])
    let service = '';
    useEffect(() => {
        let callData = async () => {
            try {
                const response = await axios.get('http://localhost:4500/bikes');
                setBikes(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        callData();
    }, []);

    useEffect(() => {
        let uniqueBrands = Array.from(new Set(bikes.map(ele => ele.brand)));
        setBrand(uniqueBrands);
    }, [bikes]);

    useEffect(() => {
        let uniqueBikeName = Array.from(new Set(bikes.map(ele => ele.name)));
        setBikeName(uniqueBikeName);
    }, [bikes]);

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const changeBikeName = (event) => {
        setSelectedBike(event.target.value);
        handleSelection();
    };

    const handleReset = () => {
        setSelectedBrand('');
        setSelectedBike('');
        setIsSelectionDisabled(false);
    };

    const handleSelection = () => {
        setIsSelectionDisabled(true);
    };

    let handleSave = () => {
        if (isSelectionDisabled) {
            axios.post('http://localhost:4500/savebike', { emailid, selectedBike, userService })
                .then(result => {
                    // Handle the response
                    console.log(result);
                })
                .catch(err => {
                    // Handle errors
                    console.error(err);
                });

        } else {
            alert("please First select the Brand And Bike Name")
        }
    }

    return (
        <div>
            <form className="max-w-sm mx-auto">
                <label htmlFor="brands" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select a brand
                </label>
                <select
                    id="brands"
                    onChange={handleBrandChange}
                    disabled={isSelectionDisabled}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="">Choose Your Bike Brand</option>
                    {brand.map((ele) => (
                        <option key={ele} value={ele}>
                            {ele}
                        </option>
                    ))}
                </select>

                {selectedBrand && (
                    <>
                        <label htmlFor="bikeNames" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Select a bike name
                        </label>
                        <select
                            id="bikeNames"
                            onChange={changeBikeName}
                            disabled={isSelectionDisabled}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Choose Your Bike Name</option>
                            {bikes
                                .filter((ele) => ele.brand === selectedBrand)
                                .map((ele, ind) => (
                                    <option key={ind} value={ele.name}>
                                        {ele.name}
                                    </option>
                                ))}
                        </select>
                    </>
                )}

                <div className="mt-3">

                    <button type="button" onClick={handleReset} className="btn btn-secondary">
                        Reset
                    </button>
                </div>
            </form>
            <p>
                Selected: {selectedBrand}, {selectedBike}
            </p>
            <button type="button" onClick={handleSave} className="btn btn-secondary">
                Save Changes
            </button>
            <hr style={{ height: 2, borderWidth: 0, color: 'gray', backgroundColor: 'gray', margin: '50px 0 50px 0' }} />
        </div>
    );
}

export default Bikes;
