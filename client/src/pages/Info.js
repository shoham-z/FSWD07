const Info = (props) => {
    return (
        <div className='info'>
            <h3>Your phone number is {props.userData.phone}</h3>
            <h3>Your email address is {props.userData.email}</h3>
        </div>
    );
};

export default Info;
