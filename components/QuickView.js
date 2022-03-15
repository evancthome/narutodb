import Image from 'next/image'
import Link from 'next/link'
import capitalize from '../functions/capitalize'
import villageColor from '../functions/villageColor'

function QuickView({ c }) {
  return (
    <Link href={`/characters/${c._id}`} passHref>
      <div
        style={{ backgroundColor: villageColor(c.village) }}
        className='quick-view'
      >
        <Image
          className='avatar'
          layout='fixed'
          width='150px'
          height='150px'
          src={c.avatarSrc}
          alt={`${c.name} Avatar`}
        />
        <div className='quick-info'>
          <h3>{c.name}</h3>
          {c.village === '' ? (
            <p className='semibold'>Unknown Village</p>
          ) : (
            <p className='semibold'>{capitalize(c.village)}</p>
          )}
          <p className='semibold'>
            {c.rank === 'Unknown' ? `${c.rank} Rank` : c.rank}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default QuickView
