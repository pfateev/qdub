import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { RegistrationForm } from './RegistrationForm';

jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
  json: () => Promise.resolve({ studentID: 123 })
}));

describe('RegistrationForm', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    const { getByLabelText } = render(<RegistrationForm setStudentID={jest.fn()} />);

    const firstNameInput = getByLabelText(/First Name/i);
    expect(firstNameInput).toBeInTheDocument();

    const lastNameInput = getByLabelText(/Last Name/i);
    expect(lastNameInput).toBeInTheDocument();

    const checkbox = getByLabelText(/Are you a TA\?/i);
    expect(checkbox).toBeInTheDocument();
  });

  it('updates first name and last name state when inputs are changed', () => {
    const { getByLabelText } = render(<RegistrationForm setStudentID={jest.fn()} />);

    const firstNameInput = getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');

    const lastNameInput = getByLabelText(/Last Name/i);
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(lastNameInput.value).toBe('Doe');
  });

  it('updates isTA state when checkbox is clicked', () => {
    const { getByLabelText } = render(<RegistrationForm setStudentID={jest.fn()} />);

    const checkbox = getByLabelText(/Are you a TA\?/i);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('calls setStudentID and sets studentID in state when form is submitted', async () => {
    const setStudentID = jest.fn();
    const { getByText } = render(<RegistrationForm setStudentID={setStudentID} />);

    const submitButton = getByText(/Sign up!/i);
    fireEvent.click(submitButton);

    expect(setStudentID).toHaveBeenCalledWith(123);
  });
});

afterAll(() => {
  fetch.mockRestore();
});
