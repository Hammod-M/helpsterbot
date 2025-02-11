export class ErrorBoundary extends React.Component {
   state = { hasError: false };

   static getDerivedStateFromError() {
      return { hasError: true };
   }

   render() {
      if (this.state.hasError) {
         return <div>Произошла ошибка</div>;
      }
      return this.props.children;
   }
}
