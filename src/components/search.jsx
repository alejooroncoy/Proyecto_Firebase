import React,{useState,useLayoutEffect,useEffect} from 'react';
import '../assets/styles/search.scss';
import {connect} from 'react-redux';
import {result,Boolean} from '../actions';
const Search = props => {
    const [state,setState] = useState({
        result: [],
    })
    // useEffect(() => {
    //     const elems = document.querySelectorAll('.autocomplete');
    //     var instances = M.Autocomplete.init(elems,{
    //         data: {
    //             'Cerveza Corona': null,
    //             'Cerveza Cristal':null,
    //             'Cerveza Cusqueña': null,
    //             'Cerveza Pilsen Callao': null
    //         },
    //         onAutocomplete: texto => {
    //             const result1 = props.home.filter(item =>
    //                 item.data.title.toLocaleLowerCase().includes(texto.toLocaleLowerCase()));
    //             console.log(result1);
    //             setState({
    //                     ...state,
    //                     result: result1 
    //             })
    //             if(state.result)
    //             {
    //                 props.result(state.result)
    //             }
    //         }
    //         })
    // },[])
    const onSubmit = e => {
        const word = e.target.value
        const result = props.home.filter(item =>
            item.data.title.toLowerCase().includes(word.toLowerCase())
        );
        setState({
                ...state,
                result: result 
        })
        if(word.length > 1)
        {
            props.result(state.result);
        }else {
            props.Boolean(false);
        }
    };
    return(
        <div className="w-1/2 h-7 bg-primary rounded-md row">
           <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                            <input 
                            id='search' 
                            type="email"
                            title="Encuentra lo que necesitas.."
                            className="font-extrabold"
                            onChange={onSubmit}
                            />
                            <label htmlFor="search" style={{color: 'black'}}>Buscar..</label>
            </div>
        </div>
    )
};
const mapDispatchToProps = {
    result,
    Boolean
}
export default connect(null,mapDispatchToProps)(Search);