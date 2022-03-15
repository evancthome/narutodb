import { useRouter } from 'next/router'
import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query'
import capitalize from '../../functions/capitalize'
import villageColor from '../../functions/villageColor'
import Link from 'next/link'
import Image from 'next/image'
import Loader from '../../components/Loader'
import he from 'he'

function Character() {
  const router = useRouter()
  const id = router.query.id

  const endpoint = 'https://narutoql.up.railway.app/graphql/'

  const { data, isLoading } = useQuery(['character', id], () =>
    request(
      endpoint,
      gql`
        {
          character(id: "${id}") {
            name
            avatarSrc
            description
            village
            age
            nameMeaning
            notableFeatures
            rank
            notableQuotes
          }
        }
      `,
    ),
  )

  return (
    <>
      {!isLoading ? (
        <div
          className='character-view'
          style={{
            background: villageColor(data.character.village),
          }}
        >
          <div className='container'>
            <Link href='/'>Back</Link>
            <Image
              className='avatar'
              layout='fixed'
              width='150px'
              height='150px'
              src={data.character.avatarSrc}
              alt={`${data.character.name} Avatar`}
            />
            <h2>{data.character.name}</h2>
            <p style={{ fontSize: '1.2rem' }} className='semibold'>
              {capitalize(data.character.village)}
            </p>
            <p style={{ fontSize: '1.2rem' }} className='semibold'>
              {data.character.rank === 'Unknown'
                ? `${data.character.rank} Rank`
                : data.character.rank}
            </p>
            {data.character.age != null ? (
              <p>
                <span className='semibold'>Age: </span>
                {data.character.age}
              </p>
            ) : null}
            {data.character.notableFeatures ? (
              <p>
                <span className='semibold'>Notable Features: </span>
                {he.decode(data.character.notableFeatures)}
              </p>
            ) : null}
            {data.character.nameMeaning ? (
              <p>
                <span className='semibold'>Meaning of name:</span>{' '}
                {he.decode(data.character.nameMeaning)}
              </p>
            ) : null}
            {data.character.notableQuotes ? (
              <p>
                <span className='semibold'>Notable Quotes:</span>{' '}
                {he.decode(data.character.notableQuotes)}
              </p>
            ) : null}
            <p>{he.decode(data.character.description)}</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
}
export default Character
