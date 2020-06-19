// 开发时全部导入，但要做标记，以便生成模式时压缩代码
/**
import {
  Icon,
  Button,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Link,
  Input,
  Select,
  Option,
  Tooltip,
  Row,
  Col,
  Scrollbar
} from 'element-ui'
import { loadPlugins } from '../utils/index' 
loadPlugins([...])
*/

import cookies from 'js-cookie'
import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI, {
  size: cookies.get('size') || 'small' // set element-ui default size
})
