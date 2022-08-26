import Header from '../../components/Header';
import UsersForm from '../../components/UsersForm';
import UsersList from '../../components/UsersList';

export default function Management() {
  return (
    <main>
      <section className="checkout w-screen h-screen  pt-[120px] pb-[100px]">
        <div>
          <Header />
        </div>
        <div className="body__screen mx-auto">
          <div className="body__title2 my-4">Administração</div>
          <UsersForm />
          <UsersList />
        </div>
      </section>
    </main>
  );
}
