import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainMenu from '../MainMenu';
import { useNavigation } from '@react-navigation/native';

//mock the useNavigation hook
jest.mock('@react-navigation/native');

describe('<MainMenu />', () => {
  it('renders all buttons', () => {
    //render function sets up a virtual DOM (document oriented model) environment
    //that has the utility functions (getByText, getByTestID) that we are extracting to be used for testing
    const { getByText, getByTestId } = render(<MainMenu />);

    expect(getByText('Financial Planner')).toBeTruthy();
    expect(getByText('Financial Literacy')).toBeTruthy();
    expect(getByText('Investment Simulator')).toBeTruthy();
    expect(getByText('Sign Out')).toBeTruthy();

    //additional assertions for the buttons using testIDs which is more accurate
    expect(getByTestId('financialPlannerButton')).toBeTruthy();
    expect(getByTestId('chatbotButton')).toBeTruthy();
    expect(getByTestId('investmentSimulatorButton')).toBeTruthy();
  });

  it('navigates to the correct screen when "Financial Planner" button is pressed', () => {
    //creates a mock navigation object with a navigate function to erase the actual navigation through the stacks
    const navigate = jest.fn();
    useNavigation.mockReturnValue({ navigate });

    const { getByTestId } = render(<MainMenu />);

    fireEvent.press(getByTestId('financialPlannerButton'));

    //assert that the navigate function was called with the correct screen name
    expect(navigate).toHaveBeenCalledWith('Financial Planner');
  });

  it('navigates to the correct screen when "Financial Literacy" button is pressed', () => {
    const navigate = jest.fn();
    useNavigation.mockReturnValue({ navigate });

    const { getByTestId } = render(<MainMenu />);

    fireEvent.press(getByTestId('chatbotButton'));

    expect(navigate).toHaveBeenCalledWith('Chatbot');
  });

  it('navigates to the correct screen when "Investment Simulator" button is pressed', () => {
    const navigate = jest.fn();
    useNavigation.mockReturnValue({ navigate });

    const { getByTestId } = render(<MainMenu />);

    fireEvent.press(getByTestId('investmentSimulatorButton'));

    expect(navigate).toHaveBeenCalledWith('Investment Simulator');
  });
});
