import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaRegTrashAlt } from 'react-icons/fa';
import { getAllUsers } from '../../services/user.services';
import { setUser } from '../../store/actions';

function UsersList(props) {
  const { userRegistration, dispatchRegisterUser } = props;
  const [allUsers, setAllUsers] = useState([]);

  const handleAllUsers = async () => {
    const users = await getAllUsers();
    setAllUsers(users);
    dispatchRegisterUser(false);
    return users;
  };

  useEffect(() => {
    handleAllUsers();
  }, [userRegistration]);

  return (
    <div className="pb-[150px]">
      <div className="body__title3 my-4">Lista de usuários</div>
      <div className="flex">
        <div className="w-[6%] product__table-header">#ID</div>
        <div className="w-[30%] product__table-header">Nome</div>
        <div className="w-[30%] product__table-header">Email</div>
        <div className="w-[24%] product__table-header">Tipo</div>
        <div className="w-[10%] product__table-header">
          <span className="hidden sm:block">Remover</span>
          <span className="sm:hidden">X</span>
        </div>
      </div>
      { allUsers.map((user, index) => (
        <div key={ user.id } className="flex">
          <div
            className="w-[6%] product__table-body"
            data-testid={ `admin_manage__element-user-table-item-number-${index}` }
          >
            { user.id }
          </div>
          <div
            className="w-[30%] product__table-body justify-start"
            data-testid={ `admin_manage__element-user-table-name-${index}` }
          >
            { user.name }
          </div>
          <div
            className="w-[30%] product__table-body"
            data-testid={ `admin_manage__element-user-table-email-${index}` }
          >
            { user.email }
          </div>
          <div
            className="w-[24%] product__table-body"
            data-testid={ `admin_manage__element-user-table-role-${index}` }
          >
            { user.role }
          </div>
          <div
            className="w-[10%] product__table-body"
            data-testid={ `admin_manage__element-user-table-remove-${index}` }
          >
            <FaRegTrashAlt size="22px" />
          </div>
        </div>
      ))}
    </div>
  );
}

UsersList.propTypes = {
  userRegistration: PropTypes.array,
  dispatchRegisterUser: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  userRegistration: state.registerUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRegisterUser: (users) => dispatch(setUser(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
