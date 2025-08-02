import '../index.css'

export default function HomeCard({icon, subTitle, text, onClick}) {
    const sectionStyle = 'bg-neutral-900 p-4 rounded lg:w-1/5 w-2/3 md:w-1/4 sm:w-2/5 hover:bg-neutral-950 hover:scale-110 transition duration-300 ease-in cursor-pointer shadow-xl'
    const subTitleStyle = 'flex items-center justify-center gap-1 text-white text-2xl font-semibold'
    const textStyle = 'text-neutral-400 flex justify-center items-center'

    return (
        <div onClick={onClick} className={sectionStyle}>
            <h1 className={subTitleStyle}>
                {icon}
                {subTitle}
            </h1>
            <span className={textStyle}>
                {text}
            </span>
        </div>
    )
}