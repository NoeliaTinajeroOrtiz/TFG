import { GoogleLogout } from 'react-google-login';

const clientId = "382864808627-8h8tlqpuv0tv5829jsdghsmcldu4qshp.apps.googleusercontent.com";

function Logout () {

    const onSuccess = () => {

        console.log ("Logout correcto");
    }

    return (

        <div id = "signOutButton">
            <GoogleLogout
                clientId = {clientId}
                buttonText = {"Logout"}
                onLogoutSuccess = {onSuccess}
            />
        </div>
    )
}

export default Logout;