export default function TwoColumnsSection(props) {
    let order = "";
    if(props.imagePos === "left"){
        order = "order-first order-md-first"
    } else {
        order = "order-first order-md-last"
    }

    return (
        <section className="container-md" id={props.id}>
            <div className="row pt-5 pb-5 align-items-center">
                <div className="col-md-6">
                    {props.children}
                </div>
                <div className={`col-md-6 ${order} d-flex`}>
                    <img src={props.img} alt={props.alt} className={`hero-img ${props.imgClass}`}></img>
                </div>
            </div>
        </section>
    )
}