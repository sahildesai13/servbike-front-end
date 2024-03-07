import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [selectedServiceType, setSelectedServiceType] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const callData = async () => {
            try {
                const response = await axios.get('http://localhost:4500/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        callData();
    }, []);

    useEffect(() => {
        // Filter services based on the selected service type
        if (selectedServiceType) {
            const filtered = services.filter((service) => service.ServiceType === selectedServiceType);
            setFilteredServices(filtered);
            setSelectedService(null);
        } else {
            setFilteredServices([]);
            setSelectedService(null);
        }
    }, [selectedServiceType, services]);

    const handleServiceTypeChange = (event) => {
        setSelectedServiceType(event.target.value);
    };

    const handleServiceChange = (event) => {
        const selectedValue = event.target.value;
        const selectedService = filteredServices.find((service) => service.ServiceName === selectedValue);
        setSelectedService(selectedService);
    };

    return (
       <div class="max-w-sm mx-auto">
  <h2 class="text-2xl font-bold mb-4">Services</h2>

  <div class="mb-4">
    <label htmlFor="serviceType" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Select a Service Type:</label>
    <select
      id="serviceType"
      onChange={handleServiceTypeChange}
      value={selectedServiceType}
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="" disabled>Select a service type</option>
      {[...new Set(services.map((service) => service.ServiceType))].map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  </div>

  {selectedServiceType && (
    <div class="mb-4">
      <label htmlFor="serviceName" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Select a Service Name:</label>
      <select
        id="serviceName"
        onChange={handleServiceChange}
        value={selectedService ? selectedService.ServiceName : ''}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>Select a service</option>
        {filteredServices.map((service) => (
          <option key={service.ServiceName} value={service.ServiceName}>
            {service.ServiceName}
          </option>
        ))}
      </select>
    </div>
  )}

  {selectedService && (
    <div>
      <h3 class="text-xl font-bold mb-2">Selected Service:</h3>
      <p class="mb-1">Service Name: {selectedService.ServiceName}</p>
      <p class="mb-1">Service Type: {selectedService.ServiceType}</p>
      <p class="mb-1">Part: {selectedService.Part}</p>
      <p class="mb-1">Price: {selectedService.Price}₹</p>
    </div>
  )}
</div>

    );
};

export default Services;
