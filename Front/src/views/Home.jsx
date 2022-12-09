import TwoColumnsSection from '../components/TwoColumnsSection';
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <>
            <TwoColumnsSection img="/images/hero.svg" alt="Ilustración de un desarrollador Web programando">
                <h2>Hola, soy Marcos Arcusin</h2>
                <p>
                    <b>Soy diseñador y desarrollador Web Full-Stack</b> con más de <b>3 años de experiencia</b> en aplicaciones web y móviles.
                </p>
                <p>
                    Actualmente utilizo tecnologías como <b>MongoDB, Express.js, React.js, Node.js, Vue.js, WordPress, PHP, Laravel, MySQL, HTML5, CSS3, Bootstrap, JavaScript, Git, GitHub, Firebase,</b> entre otras.
                </p>
                <div className="btn-container d-flex gap-2">
                    <Link to="/projects" className="btn btn-outline-primary">Ver proyectos</Link>
                    <a href="mailto:marcosarcu@gmail.com" className="btn btn-primary" target="_blank">Contactame</a>
                </div>
            </TwoColumnsSection>
            <TwoColumnsSection id="about" img="/images/about.jpg" alt="Una fotografía de Marcos Arcusin" imagePos="left" imgClass="about-img">
                <h2>Acerca de mí</h2>
                <p>
                    Mi nombre es Marcos Arcusin, <b>comencé a introducirme al mundo del desarrollo web a los 18 años.</b> Desde ese momento, me he dedicado a aprender y mejorar mis habilidades en el desarrollo de aplicaciones web y móviles.
                </p>
                <p>
                    Durante los ultimos años me fui capacitando y adquiriendo nuevos conocimientos. Me considero una persona que sabe <b>trabajar en equipo, adaptarse a nuevas tecnologías</b> y soy capaz de <b>aprender de forma autodidacta.</b> Actualmente me encuentro <b>buscando empleo como desarrollador Full-Stack.</b>
                </p>
            </TwoColumnsSection>
            <TwoColumnsSection img="/images/study.svg" alt="Ilustración de un estudiante">
                <h2>Mis estudios</h2>
                <p>
                    En 2019 me recibí de <b>Técnico en Multimedios.</b> Allí aprendí a utilizar programas como <b>Adobe Photoshop, Adobe Illustrator, Adobe Premiere.</b> Además, adquirí conocimientos de <b>diseño gráfico, edición de video y animación.</b>
                </p>
                <p>
                    Actualmente, estoy finalizando la carrera de <b>Diseño y Desarrollo Web</b> en la Escuela Da Vinci. Durante la cursada, aprendí tecnologías como <b>HTML5, CSS3, JavaScript, MongoDB, Express.js, React.js, Node.js, Vue.js, Bootstrap, PHP, Laravel, MySQL, Git, GitHub,</b> entre otras.
                </p>
            </TwoColumnsSection>
        </>
    )
}
