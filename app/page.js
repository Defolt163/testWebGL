'use client';
import Scene from './Scene';
import FooterPageComponent from './Footer/Footer'

export default function Home() {
  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}><Scene/></div>
      <div className="relative text-white py-12 h-max bg-[url('/AppMockup.png')] bg-cover bg-fixed bg-center before:content[''] before:absolute before:top-0 before:left-0 before:bg-black before:opacity-75 before:h-full before:w-full before:z-[0]">
        <div className='relative container mx-auto z-[1]'>
          <h2 className='mb-8 text-5xl font-bold'>Пара слов о проекте</h2>
          <h3 className='text-xl'>
            Знакомьтесь с новым приложением, созданным местными энтузиастами специально для жителей и гостей Шенталинского района! Мы – команда неравнодушных людей, которые преследуют одну цель: сделать передвижение по нашему замечательному региону максимально удобным и комфортным.<br/><br/>

            Живете в отдаленном уголке района? Не проблема! Наше приложение объединяет водителей и пассажиров, позволяя организовывать совместные поездки. Теперь добраться в нужное место стало гораздо проще и доступнее.<br/><br/>

            Мы разработали это приложение с любовью к нашей малой родине и желанием сделать жизнь в Шенталинском районе более комфортной. Здесь вы найдете удобный инструмент для планирования поездок, отслеживания маршрутов.<br/><br/>

            Присоединяйтесь к нашему сообществу и откройте для себя новые горизонты мобильности в Шенталинском районе! Вместе мы сделаем передвижение по нашим родным местам простым и удобным как никогда раньше.
          </h3>
        </div>
      </div>
      <FooterPageComponent/>
    </>
    
      
  );
}
