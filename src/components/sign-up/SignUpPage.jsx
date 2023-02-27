import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StepMap } from "./StepMap";

export default function SignUpPage() {
  /* Hooks and state management */
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const numberOfSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);

  /* Control step switching and submit */

  const onFinish = () => {
    // make request, and navigate to the catalog or main page if everything is fine
  };

  const goToPrevious = () => setCurrentStep(Math.max(currentStep - 1, 1));

  const goToNext = () => {
    let errors = {};

    switch (currentStep) {
      case 1:
        if (firstname.trim() === "")
          errors.firstname = "First name is required";
        else if (!/^[a-zA-Z0-9]{2,20}$/.test(firstname.trim()))
          errors.firstname = "Name can contain only letters and numbers!";
        if (lastname.trim() === "") 
          errors.lastname = "Last name is required";
        else if (!/^[a-zA-Z0-9]{2,20}$/.test(lastname.trim()))
          errors.lastname = "Name can contain only letters and numbers!";
        break;
      case 2:
        if (!phone.trim())
          errors.phone = "Phone number is required";
        else if (!/^\+\d{12}$/.test(phone.trim())) 
          errors.phone = "Invalid phone number";
        break;
      case 3:
        if (!email.trim()) 
          errors.email = "Email is required";
        else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email.trim())) 
          errors.email = "Invalid email address";

        if (!password.trim())
          errors.password = "Password is required";
        else if (password.trim().length < 8)
          errors.password = "Password must be at least 8 characters long";
        
        if (password !== passwordConfirmation)
          errors.passwordConfirmation = "Passwords do not match";
        break;

      default:
        break;
    }

    if (Object.keys(errors).length === 0) {
      setCurrentStep(Math.min(currentStep + 1, numberOfSteps));
      setFormErrors({});
    } 
    else 
      setFormErrors(errors);
  };

  /* JSX segments for each step */

  const getFirstStep = () => {
    return (
      <div className="flex flex-col h-full space-y-2">
        <div className="form-control">
          <input
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            type="text"
            name="firstname"
            placeholder="Firstname"
            className="transparent-text-input"
          />
          {formErrors.firstname && (
            <label className="label">
              <span className="validation-label">{formErrors.firstname}!</span>
            </label>
          )}
        </div>
        <div className="form-control">
          <input
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            type="text"
            name="lastname"
            placeholder="Lastname"
            className="transparent-text-input"
          />
          {formErrors.lastname && (
            <label className="label">
              <span className="validation-label">{formErrors.lastname}!</span>
            </label>
          )}
        </div>
      </div>
    );
  };

  const getSecondStep = () => (
    <div className="form-control w-2/3">
      <input
        type="tel"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        name="phone"
        placeholder="Phone Number"
        className="transparent-text-input"
      />
      {formErrors.phone && (
        <label className="label">
          <span className="validation-label">{formErrors.phone}!</span>
        </label>
      )}
    </div>
  );

  const getThirdStep = () => (
    <div className="flex flex-col h-full w-2/3 gap-2">
      <div className="form-control w-full">
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="transparent-text-input"
        />
        {formErrors.email && (
          <label className="label">
            <span className="validation-label">{formErrors.email}!</span>
          </label>
        )}
      </div>
      <div className="form-control w-full">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          className="transparent-text-input"
        />
        {formErrors.password && (
          <label className="label">
            <span className="validation-label">{formErrors.password}!</span>
          </label>
        )}
      </div>
      <div className="form-control w-full">
        <input
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          className="transparent-text-input"
        />
        {formErrors.passwordConfirmation && (
          <label className="label">
            <span className="validation-label">
              {formErrors.passwordConfirmation}!
            </span>
          </label>
        )}
      </div>
    </div>
  );

  const getFourthStep = () => (
    <div>
      <p className="font-bold text-x-green">
        Seems nice! Confirm registrarion!
      </p>
      <p className="text-4xl">😉</p>
    </div>
  );

  const getStepSegment = () => {
    switch (currentStep) {
      case 1:
        return getFirstStep();
      case 2:
        return getSecondStep();
      case 3:
        return getThirdStep();
      case 4:
        return getFourthStep();
      default:
        return getFirstStep();
    }
  };

  const getStepButtons = () => (
    <div className="btn-group w-2/3">
      {currentStep === 1 || (
        <button
          onClick={goToPrevious}
          type="button"
          className="standard-form-button"
        >
          Back
        </button>
      )}
      {currentStep === numberOfSteps && (
        <button onClick={onFinish} className="standard-form-button">
          I Confirm
        </button>
      )}
      {currentStep < numberOfSteps && (
        <button
          onClick={goToNext}
          type="button"
          className="standard-form-button"
        >
          Next
        </button>
      )}
    </div>
  );

  /* Render form */

  return (
    <div className="flex flex-row min-h-screen">
      <style>
        {`
          .h-35-percent{
            height: 35vh
          }
        `}
      </style>
      <div className="basis-full md:basis-1/2 xl:basis-2/5 flex flex-col mx-auto py-5 bg-x-white">
        <div className="w-2/5 mx-auto">
          <img
            src={require("../../pictures/logo-black-no-background.png")}
            className="object-scale-down"
          />
        </div>
        <div className="pt-6 pb-8">
          <p className="text-3xl font-bold mt-7">Creating New Account!</p>
          <StepMap currentStep={currentStep} />
        </div>
        <div className="h-35-percent flex flex-col justify-between">
          <form className="flex flex-row justify-center w-full">
            {getStepSegment()}
          </form>
          <div className="flex flex-row justify-center">{getStepButtons()}</div>
        </div>
        <p className="text-sm mt-2">
          Have an account already?
          <Link to="/login">
            <strong className="text-x-red underline"> Log In!</strong>
          </Link>
        </p>
        <div className="flex flex-row mt-10">
          <hr className="grow border-gray-500 border-spacing-1 my-auto mx-10" />
          <p>Sign Up With</p>
          <hr className="grow border-gray-500 border-spacing-1 my-auto mx-10" />
        </div>
        <div className="flex flex-row justify-center gap-10 py-3 text-5xl">
          <i class="bi bi-google text-red-400"></i>
          <i class="bi bi-twitter text-blue-400"></i>
          <i class="bi bi-facebook text-blue-600"></i>
        </div>
      </div>
    </div>
  );
}
