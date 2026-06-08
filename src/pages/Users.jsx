import { useEffect, useRef } from "react"
import ProfileCard from "../features/users/components/ProfileCard"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import useUserForm from "../features/users/hooks/useUserForm"
import useAddUserMutation from "../features/users/hooks/useAddUserMutation"
import useFollowUserMutation from "../features/users/hooks/useFollowUserMutation"
import useDeleteUserMutation from "../features/users/hooks/useDeleteUserMutation"
import useInfiniteUsersQuery from "../features/users/hooks/useInfiniteUsersQuery"
import { randomFollowerGrowth, } from "../features/users/services/usersService"
// import { useQueryClient } from "@tanstack/react-query"
import useUsersSync from "../features/users/hooks/useUsersSync"

function Users() {
  const addUserMutation = useAddUserMutation()
  const followUserMutation = useFollowUserMutation()
  const deleteUserMutation = useDeleteUserMutation()
  const loadMoreRef = useRef(null)
  useUsersSync()
  
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsersQuery()

  // const queryClient = useQueryClient()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0]

      if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    })

    const currentRef = loadMoreRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    const interval = setInterval(() => {
      randomFollowerGrowth()
    }, 7000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const users = data?.pages.flat() ?? []

  const handleFollow = async (id) => {
    try {
      await followUserMutation.mutateAsync(id)
    } catch (err) {
      console.error(err.message)
    }
  }

  // useEffect(() => {
  //   const unsubscribe = subscribeToFollowerGrowth(({ userId }) => {
  //       queryClient.setQueryData(['users', 'infinite'],
  //         (oldData) => {
  //           if (!oldData) return oldData

  //           return {
  //             ...oldData,

  //             pages:
  //               oldData.pages.map((page) => page.map(
  //                 (user) => user.id === userId ? {
  //                   ...user,
  //                   followers: user.followers + 1,
  //                   }
  //                   : user
  //                 )
  //               ),
  //             }
  //           }
  //         )
  //       }
  //     )

  //   return unsubscribe
  // }, [queryClient])

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserMutation.mutateAsync(id)
    } catch (err) {
      console.error(err.message)
    }
  }

  const addUser = async (newUser) => {
    try {
      await addUserMutation.mutateAsync(newUser)
    } catch (err) {
      console.error(err.message)
    }
  }

  const { formData, formError, handleInputChange, handleSubmit } =
    useUserForm(addUser)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section>
      <h1>Users Page</h1>
      <h3>Try to add user and mess around with it</h3>

      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <Input
          name="role"
          placeholder="Enter role"
          value={formData.role}
          onChange={handleInputChange}
        />

        <Button type="submit" disabled={addUserMutation.isPending}>
          {addUserMutation.isPending ? "Adding..." : "Add User"}
        </Button>
      </form>

      <p style={{ color: '#666', fontStyle: 'italic', marginBottom: '1.5rem' }}>
      Note: The follower count of users may gradually increase randomly (refer to {` `}
        <a
          href="https://github.com/lilhalzy/frontend-systems-lab/commit/6c750df6b6d8993b4b12b214ec1ecd10d064df8b"
          target="_blank"
          rel="noopener noreferrer"
          style={{textDecoration: 'underline', color: '#888'}}
        >
          6c750df
        </a>)
      </p>

      {formError && <p>{formError}</p>}
      {users.map((user) => 
        (
          <div key={user.id} style={{ marginBottom: '1.5rem',  padding: '1rem', border: '1px solid #ccc' }}>
            <ProfileCard
              name={user.name}
              role={user.role}
              online={user.online}
              followers={user.followers}
              onFollow={() => handleFollow(user.id)}
              onDelete={() => handleDeleteUser(user.id)}
            />
          </div>
        )
      )
    }
      <div ref={loadMoreRef}>
        {
          isFetchingNextPage ? 'Loading more' : ''
        }
      </div>
    </section>
  )
}

export default Users
