import Image from 'next/image'
import Link from 'next/link'
import useCapitalize from '../hooks/useCapitalize'
import useVillageColor from '../hooks/useVillageColor'
import he from 'he'

function QuickView({ c }) {
  const vColor = useVillageColor(c.village)

  return (
    <Link href={`/characters/${c._id}`}>
      <div style={{ backgroundColor: vColor }} className='quick-view'>
        <Image
          className='avatar'
          layout='fixed'
          width='150px'
          height='150px'
          src={c.avatarSrc}
        />
        <div className='quick-info'>
          <h3>{c.name}</h3>
          {c.village === '' ? (
            <p className='semibold'>Unknown Village</p>
          ) : (
            <p className='semibold'>{useCapitalize(c.village)}</p>
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
