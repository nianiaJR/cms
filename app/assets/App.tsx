import React from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { Layout } from 'antd'

import Login from './modules/Login'

const { Header, Content } = Layout

const App = () => (
  <Layout>
    <Header>
    </Header>
    <Content>
      {/* <div className="beauty-cms">
        <h3>Hello world</h3>
        <p>这是一个 egg + react 的全栈应用，前端基于webpack构建</p>
      </div> */}
      <Switch>
        <Route path="/" component={Login}></Route>
        <Redirect to="/" />
      </Switch>
    </Content>
  </Layout>
)

export default withRouter(hot(App))
