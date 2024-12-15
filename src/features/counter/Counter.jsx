import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, incrementByValue } from "./counterSlice";


export default function Counter() {

    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();


    return(
        <>
            <h1>Count: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByValue(5))}>Increment (5)</button>
        </>
    )
}