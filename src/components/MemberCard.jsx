export default function MemberCard({ icon, username, roles = [], isStaff }) {
    const profile = icon === 'default'
    ? 'src/assets/blank-profile-picture.png'
    : icon

    return (
        <article className="w-1/2 sm:w-1/3 md:w-1/6 lg:w-[12%]">
            <section className="bg-neutral-900 bg-opacity-55 p-3 rounded-t-md">
                <div
                    className={`bg-[url(${profile})] bg-cover bg-center rounded aspect-square`}
                ></div>
            </section>
            <section className="bg-neutral-900 bg-opacity-55 p-3 flex flex-col gap-3 rounded-b-md">
                <div className="text-white text-lg sm:text-xl md:text-2xl text-center font-bold break-words flex flex-col items-center gap-1">
                    <span>{username}</span>
                    <span className={`${isStaff ? 'bg-blue-700 text-blue-950' : 'invisible'} rounded-xl text-xs sm:text-sm md:text-base px-2 py-0.1`}>
                        Staff
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {roles.map((rol, index) => (
                        <div
                            className="bg-neutral-700 text-sm sm:text-base text-white rounded-xl px-2 py-1"
                            key={index}
                        >
                            {rol}
                        </div>
                    ))}
                </div>
            </section>
        </article>
    )
}