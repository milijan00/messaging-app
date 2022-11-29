
export const onFirstnameChange = (state, action) =>{
    state.registrationData.firstname = action.payload;
};

export  const onLastnameChange = (state, action) =>{
    state.registrationData.lastname = action.payload;
};

export  const onRegEmailChange = (state, action) =>{
    state.registrationData.email = action.payload;
};

export  const onRegPasswordChange = (state, action) =>{
    state.registrationData.password = action.payload;
};

export   const onRegPasswordAgainChange = (state, action) =>{
    state.registrationData.passwordAgain = action.payload;
};

export   const onCountryChange = (state, action)=>{
    state.registrationData.idCountry = action.payload;
};

export  const onCityChange = (state, action)=>{
    state.registrationData.idCity = action.payload;
};

 ;
