export const loadIcons = async () => {
    const {
        library
    } = await import('@fortawesome/fontawesome-svg-core')

    const {
        faPlay,
        faFlag,
        faDatabase,
        faChartPie,
        faRefresh,
        faPause,
        faEraser,
        faEnvelope,
        faPhone,
        faUser,
        faTrashCan,
        faPen,
        faTimes,
        faGamepad,
        faRandom,
        faCircle,
        faBars,
    } = await import('@fortawesome/free-solid-svg-icons')

    const {
        faLinkedin,
        faGithub,
        faVuejs,
        faBootstrap,
        faPython,
        faFontAwesome,
    } = await import('@fortawesome/free-brands-svg-icons')

    library.add(
        faPlay,
        faLinkedin,
        faGithub,
        faFlag,
        faDatabase,
        faChartPie,
        faRefresh,
        faPause,
        faEraser,
        faEnvelope,
        faPhone,
        faVuejs,
        faBootstrap,
        faPython,
        faFontAwesome,
        faUser,
        faTrashCan,
        faPen,
        faTimes,
        faGamepad,
        faRandom,
        faCircle,
        faBars
    )
}
