const reducer = (state, action) => {
    switch(action.type)
    {
        case 'RESULT': 
        return {
            ...state,
            results: action.payload,
            enviar: true
        }
        case 'BOOLEAN':
        return{
            ...state,
            enviar: action.payload
        }
        default:
            return state;
    }
};
export default reducer;