import { useState, useEffect, useMemo } from "react"
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom"

function ResearchDataPage() {
    let [originalCapstoneData, setOriginalCapstoneData] = useState([]);
    let [capstoneData, setCapstoneData] = useState([]);
    let [filterValues, setFilterValues] = useState({
        model_name: '',
        batch_size: '',
        epochs: '',
        learning_rate: '',
        optimizer: '',
        dropout: '',
        dataset: '',
    });

    useEffect(() => {
        getCapstoneData();
    }, []);
    let navigate = useNavigate();

    let handleInputChange = (e) => {
        let { name, value } = e.target;
        setFilterValues({
            ...filterValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const filteredData = originalCapstoneData.filter(item => {
            return (
                (filterValues.model_name === '' || item.model_name === filterValues.model_name) &&
                (filterValues.batch_size === '' || item.batch_size === filterValues.batch_size) &&
                (filterValues.learning_rate === '' || item.learning_rate === filterValues.learning_rate) &&
                (filterValues.epochs === '' || item.epochs === filterValues.epochs) &&
                (filterValues.dataset === '' || item.dataset === filterValues.dataset) &&
                (filterValues.optimizer === '' || item.optimizer === filterValues.optimizer) &&
                (filterValues.dropout === '' || item.dropout === filterValues.dropout)
            );
        });

        setCapstoneData(filteredData);
    };

    let getCapstoneData = async () => {
        let response = await fetch("/api/capstone-data/");
        let data = await response.json();
        setOriginalCapstoneData(data);
        setCapstoneData(data);
    };

    const data = useMemo(() => capstoneData, [capstoneData]);
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Model Name",
                accessor: "model_name",
            },
            {
                Header: "Dataset",
                accessor: "dataset",
            },
            {
                Header: "Training Accuracy",
                accessor: "training_accuracy",
            },
            {
                Header: "Validation Accuracy",
                accessor: "validation_accuracy",
            },
            {
                Header: "Testing Accuracy",
                accessor: "testing_accuracy",
            },
            {
                Header: "Epochs",
                accessor: "epochs",
            },
            {
                Header: "Batch Size",
                accessor: "batch_size",
            },
            {
                Header: "Learning Rate",
                accessor: "learning_rate",
            },
            {
                Header: "Optimizer",
                accessor: "optimizer",
            },
            {
                Header: "Dropout",
                accessor: "dropout",
            },
        ],
        []
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });
    return (
        <div className="App">
            <div className="container">
                <div>
                    <h2>&#9782; Total Data</h2>
                    <p>{capstoneData.length}</p>
                </div>
                <div className="filter-data">
                    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                        <select
                            name="model_name"
                            value={filterValues.model_name}
                            onChange={handleInputChange}
                        >
                            <option value="">Model Name</option>
                            <option value="MobileNetV3Small">MobileNetV3Small</option>
                            <option value="EfficientNetB3">EfficientNetB3</option>
                            <option value="ResNet50">ResNet50</option>
                            <option value="AlexNet">AlexNet</option>
                            <option value="Vgg19">Vgg19</option>
                            <option value="XceptionNet">XceptionNet</option>
                        </select>
                        <select
                            name="dataset"
                            value={filterValues.dataset}
                            onChange={handleInputChange}
                        >
                            <option value="">Dataset</option>
                            <option value="Original+Image Processing">Original+Image Processing</option>
                            <option value="Original+Smote+Image Processing">Original+Smote+Image Processing</option>
                            <option value="Original+Augmentation+Image Processing">Original+Augmentation+Image Processing</option>
                        </select>
                        <select
                            name="epochs"
                            value={filterValues.epochs}
                            onChange={handleInputChange}
                        >
                            <option value="">Epochs</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        <select
                            name="batch_size"
                            value={filterValues.batch_size}
                            onChange={handleInputChange}
                        >
                            <option value="">Batch Size</option>
                            <option value="16">16</option>
                            <option value="32">32</option>
                            <option value="64">64</option>
                            <option value="128">128</option>
                        </select>
                        <select
                            name="learning_rate"
                            value={filterValues.learning_rate}
                            onChange={handleInputChange}
                        >
                            <option value="">Learning Rate</option>
                            <option value="0.001">0.001</option>
                            <option value="0.005">0.005</option>
                        </select>
                        <select
                            name="optimizer"
                            value={filterValues.optimizer}
                            onChange={handleInputChange}
                        >
                            <option value="">Optimizer</option>
                            <option value="Adam">Adam</option>
                            <option value="Adamax">Adamax</option>
                            <option value="RMSprop">RMSprop</option>
                        </select>
                        <select
                            name="dropout"
                            value={filterValues.dropout}
                            onChange={handleInputChange}
                        >
                            <option value="">Dropout</option>
                            <option value="0.2">0.2</option>
                            <option value="0.3">0.3</option>
                            <option value="0.4">0.4</option>
                            <option value="0.5">0.5</option>
                        </select>

                        <button className="btn-primary" style={{ marginLeft: '10px' }}>Apply Filters</button>
                    </form>
                </div>


                <div>
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => {
                                        if (column.id !== 'id') {
                                            return (
                                                <th {...column.getHeaderProps()}>
                                                    {column.render("Header")}
                                                </th>
                                            )
                                        }
                                        else {
                                            return null;
                                        }

                                    }

                                    )}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);

                                const rowData = row.original; // Get the entire row data

                                return (
                                    <tr {...row.getRowProps()} onClick={() => {
                                        navigate(`/capstone-data/${JSON.stringify(rowData.id)}`);
                                    }}>
                                        {row.cells.map((cell) => {
                                            if (cell.column.id !== 'id') {
                                                return (
                                                    <td {...cell.getCellProps()} key={cell.column.id}>
                                                        {cell.render('Cell')}
                                                    </td>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}

export default ResearchDataPage;