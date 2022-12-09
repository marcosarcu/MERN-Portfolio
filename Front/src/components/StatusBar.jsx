export default function StatusBar(props) {
    let type = props.type ? props.type : 'info';
    if (props.message) {
        return (
            <div className={`alert alert-${type}`}>
                {props.message}
            </div>
        )
    } else {
        return null;
    }
}
