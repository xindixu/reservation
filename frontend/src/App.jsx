import React, { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useMedia } from "react-use"
import { debounce } from "lodash"
import { Layout } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { AppRoutes, PublicRoutes } from "./routes"
import Navbar from "./components/navbar"
import { Wrapper } from "./styles"
import { mediaQuery } from "./styles/index"
import { UserContext } from "./contexts"

const { Header, Sider, Content } = Layout

const App = () => {
  const [user, setUser] = useState(null)
  const [navigationCollapsed, setNavigationCollapsed] = useState(false)
  const [navigationToggled, setNavigationToggled] = useState(false)
  const smAndUp = useMedia(mediaQuery.screenSmAndUp)
  const mdAndUp = useMedia(mediaQuery.screenMdAndUp)

  useEffect(() => {
    const resetToggled = debounce(() => setNavigationToggled(false), 100)
    window.addEventListener("resize", resetToggled)
    return () => {
      window.removeEventListener("resize", resetToggled)
    }
  }, [])

  const collapsed = navigationToggled ? navigationCollapsed : !mdAndUp

  if (user) {
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <Wrapper>
          <Router>
            <Layout>
              <Sider trigger={null} collapsed={collapsed} collapsedWidth={smAndUp ? "80" : "0"}>
                <Navbar />
              </Sider>
              <Layout>
                <Header>
                  {navigationCollapsed ? (
                    <MenuUnfoldOutlined
                      className="trigger"
                      onClick={() => {
                        setNavigationCollapsed(false)
                        setNavigationToggled(true)
                      }}
                    />
                  ) : (
                    <MenuFoldOutlined
                      className="trigger"
                      onClick={() => {
                        setNavigationCollapsed(true)
                        setNavigationToggled(true)
                      }}
                    />
                  )}
                </Header>
                <Content>
                  <AppRoutes />
                </Content>
              </Layout>
            </Layout>
          </Router>
        </Wrapper>
      </UserContext.Provider>
    )
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <PublicRoutes />
      </Router>
    </UserContext.Provider>
  )
}

export default App
