import { signInWithGoogle } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const FirebaseLogin = () => {
    const navigate = useNavigate();
    return (<button onClick={() => signInWithGoogle().then(() => navigate('/'))}>Sign in with google</button>)
};

export default FirebaseLogin;