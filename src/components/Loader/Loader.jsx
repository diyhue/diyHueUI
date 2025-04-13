import './Loader.scss';

const loading = (additionalText) => (
    <div className="loading-container">
        <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
        <p className="loading-text">Loading data, please wait...</p>
        {additionalText && <p className="additional-text">Fetching {additionalText}</p>}
    </div>
);

export default loading;
