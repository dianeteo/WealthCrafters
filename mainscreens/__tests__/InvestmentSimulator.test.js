import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import InvestmentSimulator from '../InvestmentSimulator';
import axios from 'axios';

// Mock firebase_auth.currentUser to return a mock user object with an email
jest.mock('../../config/firebase', () => ({
  firebase_auth: {
    currentUser: {
      email: 'testuser@example.com',
    },
  },
}));

// Mock axios and other dependencies as needed
jest.mock('axios');

describe('<InvestmentSimulator />', () => {
  it('fetches and displays user cash data correctly', async () => {
    // Mock the API response
    const mockUserCash = 50000;
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { price: mockUserCash } });

    const { getByText, getByTestId } = render(<InvestmentSimulator />);

    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      expect(axios.request).toHaveBeenCalled();
      expect(getByText('LIQUID CASH:')).toBeTruthy();
      expect(getByText(`$${mockUserCash} USD`)).toBeTruthy();
    });
  });

  // Add more tests for other functionalities and user interactions
});
