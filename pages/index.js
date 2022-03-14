import { request, gql } from 'graphql-request'
import { useInfiniteQuery } from 'react-query'
import MasonryInfiniteScroller from 'react-masonry-infinite'
import Loader from '../components/Loader'
import QuickView from '../components/QuickView'

export default function Home() {
  const endpoint = 'https://narutoql.up.railway.app/graphql/'
  const CHARACTERS_QUERY = gql`
    {
      characters {
        info {
          count
          pages
          next
          prev
        }
        results {
          _id
          name
          avatarSrc
          description
          rank
          village
        }
      }
    }
  `

  const { data, error, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'characters',
      async ({ pageParam = 1 }) => {
        const res = await request(
          endpoint,
          gql`
        {
          characters(page: ${pageParam}) {
            info {
              count
              pages
              next
              prev
            }
            results {
              _id
              name
              avatarSrc
              description
              rank
              village
            }
          }
        }
      `,
        )
        return res
      },
      {
        // getPreviousPageParam: (pageParam) => pageParam.characters.info.previous,
        getNextPageParam: (pageParam) => {
          return pageParam.characters.info.next
        },
      },
    )

  return (
    <div className='container'>
      <h1>narutoDB</h1>
      {isError ?? <span>{error.message}</span>}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <ul className='character-grid'> */}
          {/* <ResponsiveMasonry
            columnsCountBreakPoints={{ 330: 1, 654: 2, 980: 3 }}
          >
            <Masonry className='masonry'> */}
          <MasonryInfiniteScroller
            className='masonry'
            hasMore={hasNextPage}
            loadMore={fetchNextPage}
          >
            {data.pages.map((group) =>
              group.characters.results.map((c) => (
                <QuickView key={c._id} c={c} />
              )),
            )}
          </MasonryInfiniteScroller>
          {/* </ul> */}
          {/* </Masonry>
          </ResponsiveMasonry> */}
          {/* <button
            ref={loadMoreButtonRef}
            onClick={() => {
              fetchNextPage(data)
            }}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load Newer'
              : 'Nothing more to load'}
          </button> */}
        </>
      )}
    </div>
  )
}
