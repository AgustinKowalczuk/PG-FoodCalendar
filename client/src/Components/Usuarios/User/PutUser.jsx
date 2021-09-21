import { putUserDetails } from "../../../actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PutUser () {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    useEffect(() => {
        dispatch(putUserDetails())
    }, [dispatch, token])
    return ( 
        <div>
            <form action=""></form>
        </div>
     );
}