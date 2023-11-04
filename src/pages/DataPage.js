import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'



export default function DataPage() {
    let { id } = useParams();
    let navigate = useNavigate();
    let [capstoneData, setCapstoneData] = useState(null);

    useEffect(() => {
        let getCapstoneData = async () => {
            let response = await fetch(`/capstone-data/${id}/`);
            let data = await response.json();
            setCapstoneData(data);
        };
        getCapstoneData();
    }, [id]);



    let handleSubmit = () => {
        navigate('/')
    }

    return (
        <div>
            <div>
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
            </div>
            <h3> <span>Model Name: </span> {capstoneData?.model_name}</h3>
            <h4> <span>Training Accuracy: </span> {capstoneData?.training_accuracy}</h4>
            <h4> <span>Validation Accuracy: </span> {capstoneData?.validation_accuracy}</h4>
            <h4> <span>Testing Accuracy: </span> {capstoneData?.testing_accuracy}</h4>
            <hr></hr>
            <h5> <span>Epochs: </span> {capstoneData?.epochs}</h5>
            <h5> <span>Batch Size: </span> {capstoneData?.batch_size}</h5>
            <h5> <span>Learning Rate: </span> {capstoneData?.learning_rate}</h5>
            <h5> <span>Optimizer: </span> {capstoneData?.optimizer}</h5>
            <h5> <span>Dropout: </span> {capstoneData?.dropout}</h5>
            <h5> <span>Dataset: </span> {capstoneData?.dataset}</h5>
        </div>

    );
}
